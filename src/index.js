import express from "express";
import multer from "multer";
import fs from "fs";
import { publishToReconciliation } from "./publishToReconciliation/index.js";
import { config } from "./config.js";

const app = express();

// check if uploads directory exists and create it if not
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
  console.log("Directory 'uploads' created successfully!");
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const accountDir = req.body.account;
    if (!fs.existsSync("uploads/" + accountDir)) {
      fs.mkdirSync("uploads/" + accountDir);
      console.log("Directory created successfully!");
    }
    cb(null, "uploads" + "/" + accountDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "text/turtle") {
    return cb(null, true);
  }
  return cb(new Error("File type not supported"));
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.post(
  "/upload",
  upload.single("uploaded_file"),
  async function (req, res, next) {
    try {
      const filePath = req.file.path;
      const id = req.body.id;
      await publishToReconciliation(filePath, id);
      res.redirect("/" + "?id=" + id);
    } catch (error) {
      next(error);
    }
  }
);

app.use((error, req, res, next) => {
  console.log("Error Handling Middleware called");
  console.error(error);
  if (error.message === "File type not supported") {
    res
      .status(400)
      .send(
        "File type not supported. Please just upload a turtle file. <a href='/'>Go back</a>"
      );
  } else if (error.name === "parseFileError") {
    res
      .status(500)
      .send(
        `Something went wrong while parsing your data: ${error.error}. <a href='/'>Go back</a>`
      );
  } else if (error.name === "HandleDataError") {
    res
      .status(500)
      .send(
        "Something went wrong while processing the data. Please check the logs. <a href='/'>Go back</a>"
      );
  } else if (error.name === "NoPrefNamespaceUriError") {
    res
      .status(400)
      .send(`
      Please provide a <a href="https://vocab.org/vann/#preferredNamespaceUri">preferredNamespaceURI</a> 
      for your Concept Scheme.
      See <a href="https://github.com/dini-ag-kim/hcrt/blob/84271e3e499c746e211f95297ba451cc547e89d1/hcrt.ttl#L12">here</a> for an example.
      <br>  
      <a href='/'>Go back</a>`
      );
  }
   else {
    res
      .status(500)
      .send(
        "Something went wrong. Please ask your favorite admin to check the logs. <a href='/'>Go back</a>"
      );
  }
});

app.listen(config.app_port, function () {
  console.log(`App listening on port ${config.app_port_exposed}!`);
});
