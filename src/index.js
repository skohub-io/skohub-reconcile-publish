import express from "express";
import session from "express-session";
import multer from "multer";
import fs from "fs";
import { publishToReconciliation } from "./publishToReconciliation/index.js";
import { config } from "./config.js";
import passport from "passport"
import OAuth2Strategy from "passport-oauth2";

const app = express();
// Serve static files from the public directory
app.set('view engine', 'ejs');
app.set('views', './public');
// check if uploads directory exists and create it if not
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
  console.log("Directory 'uploads' created successfully!");
}

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const accountDir = req.body.account;
    if (!fs.existsSync("uploads/" + accountDir)) {
      fs.mkdirSync("uploads/" + accountDir);
      console.log("Directory created successfully!");
    }
    cb(null, "uploads" + "/" + accountDir);
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage, });

app.use(express.static("public"));
app.use(session({
  secret: config.session_secret,
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

// wikimedia oauth
passport.use("wikimedia", new OAuth2Strategy({
  authorizationURL: config.wikimedia_auth_url,
  tokenURL: config.wikimedia_token_url,
  clientID: config.wikimedia_id,
  clientSecret: config.wikimedia_secret,
  callbackURL: `${config.publish_service_url}/wiki/callback`
},
  function(accessToken, refreshToken, profile, cb) {
    const url = 'https://meta.wikimedia.org/w/api.php?action=query&meta=userinfo&format=json';
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'User-Agent': `SkoHub-Reconcile/1.0 (${config.contact_mail})`
      }
    };
    fetch(url, options)
      .then(response => response.json())
      .then(({ query: { userinfo } }) => {
        cb(null, { id: userinfo.id }
        )
      })
      .catch(error => console.error('Error fetching user info:', error));
  }
));

// orcid oauth
passport.use("orcid", new OAuth2Strategy({
  authorizationURL: config.orcid_auth_url,
  tokenURL: config.orcid_token_url,
  clientID: config.orcid_id,
  clientSecret: config.orcid_secret,
  callbackURL: `${config.publish_service_url}/orcid/callback`
},
  function(accessToken, refreshToken, profile, cb) {
    const url = config.orcid_getuser_url;
    const options = {
      method: 'GET',
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
        'User-Agent': `SkoHub-Reconcile/1.0 (${config.contact_mail})`
      }
    };

    fetch(url, options)
      .then(response => response.json())
      .then(data => {
        cb(null, { id: data.sub }
        )
      })
      .catch(error => console.error('Error fetching user info:', error));
  }
));

passport.serializeUser(async (user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  done(null, user);
})

app.get("/", (req, res) => {
  const data = {
    reconcileUrl: config.reconcile_service_url,
    user: req.user
  }
  res.render("index", { data });
});

app.get('/auth/mediawiki',
  passport.authenticate('wikimedia'));

app.get('/wiki/callback',
  passport.authenticate('wikimedia', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/auth/orcid',
  passport.authenticate('orcid', {
    scope: ["openid"],
    response_type: "code",
    successRedirect: "/orcid/callback"
  }));

app.get('/orcid/callback',
  passport.authenticate('orcid', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/logout',
  function(req, res) {
    const data = {
      reconcileUrl: config.reconcile_service_url,
      user: null
    }
    res.render("index", { data });
  });

app.post(
  "/upload",
  upload.single("uploaded_file"),
  async function(req, res, next) {
    try {
      const filePath = req?.file?.path;
      const fileUrl = req.body.fileUrl;
      const account = req.body.account;
      const id = req.body.id;
      const language = req.body.language
      await publishToReconciliation({
        filePath,
        fileUrl,
        account,
        id,
        language
      });
      res.redirect("/" + "?id=" + id);
    } catch (error) {
      next(error);
    }
  }
);

const showError = (error) => (
  `
      <br>
      <details>
      <summary>Error</summary>
        ${error.message}
        <pre>
        ${JSON.stringify(error, Object.getOwnPropertyNames(error), 2)}
        </pre>
      </details>
`
)

app.use((error, req, res, next) => {
  console.log("Error Handling Middleware called");
  console.error(error);
  if (error.name === "parseFileError") {
    res
      .status(500)
      .send(`
        Something went wrong while parsing your data: ${error.error}. <a href='/'>Go back</a>
        ${showError(error)}
        `
      );
  } else if (error.name === "HandleDataError") {
    res
      .status(500)
      .send(`
        Something went wrong while processing the data. Please check the logs. <a href='/'> Go back</a>
      ${showError(error)}
    `
      );
  } else if (error.name === "NoPrefNamespaceUriError") {
    res
      .status(400)
      .send(`
      <p>Please provide a <a href="https://vocab.org/vann/#preferredNamespaceUri"> preferredNamespaceURI</a> 
      for your Concept Scheme.
      See <a href="https://github.com/dini-ag-kim/hcrt/blob/84271e3e499c746e211f95297ba451cc547e89d1/hcrt.ttl#L12" > here</a> for an example.
      </p>
        <a href='/'>Go back</a>
      ${showError(error)}
    `
      );
  }
  else {
    console.log(error.message)
    res
      .status(500)
      .send(
        `Something went wrong.Please ask your favorite admin to check the logs. <a href='/' > Go back</a>
      ${showError(error)}
    `
      );
  }
});

app.listen(config.app_port, function() {
  console.log(`App listening on port ${config.app_port_exposed} !`);
});
