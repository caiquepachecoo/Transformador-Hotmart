const express = require("express");
const multer = require("multer");
const cors = require("cors");
const { v4: uuid } = require("uuid");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.static("../frontend"));
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

app.post("/upload", upload.single("pdf"), (req, res) => {

  const id = uuid();

  const url = `http://localhost:3000/view/${id}`;

  res.json({
    success: true,
    url,
    iframe: `<iframe src="${url}" width="100%" height="800" frameborder="0"></iframe>`
  });

});

app.get("/view/:id", (req, res) => {

  res.sendFile(
    path.join(__dirname, "../frontend/viewer.html")
  );

});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
