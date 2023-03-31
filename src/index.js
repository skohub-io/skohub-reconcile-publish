import express from "express";
import multer from "multer";
import fs from "fs";
import populateReconciliation from "./populateReconciliation.js";
import { randomUUID } from "crypto";

const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const accountDir = req.body.account 
    if (!fs.existsSync("uploads/" + accountDir)){
      fs.mkdirSync("uploads/" + accountDir);
      console.log('Directory created successfully!');
  }
    cb(null, 'uploads' + "/" + accountDir)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.get("/processing", (req, res) => {
  res.sendFile("processing.html", {root: "./public"});
});

app.post("/upload", upload.single("uploaded_file"), async function (req, res) {
  const filePath = req.file.path;
  const id = randomUUID();
  res.redirect("/processing" + "?id=" + id);
  populateReconciliation(filePath, id);
  // res.json({ file: req.file });
});

app.listen(3030, function () {
  console.log("App listening on port 3030!");
});
