import express from "express";
import multer from "multer";
import fs from "fs";
import { publishToReconciliation } from "./publishToReconciliation/index.js";
import { config } from "./config.js";

const app = express();

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
  } else {
    console.log("Path: ", req.path);
    res.redirect("/");
  }
});

app.listen(config.app_port, function () {
  console.log(`App listening on port ${config.app_port_exposed}!`);
});
