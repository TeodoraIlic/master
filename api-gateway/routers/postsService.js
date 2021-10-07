var express = require("express");
var router = express.Router();
const apiAdapter = require("./apiAdapter");
const isAuthorized = require("../controller/requestAuthenticator");
const multer = require("multer");
const upload = multer({ dest: "../uploads/" });

const BASE_URL = "http://localhost:3001";
const api = apiAdapter(BASE_URL);

router.get("/posts", (req, res) => {
  api.get(req.path).then((resp) => {
    res.send(resp.data);
  });
});

router.get("/posts/:id", isAuthorized, (req, res) => {
  api.get(req.path).then((resp) => {
    res.send(resp.data);
  });
});

router.delete("/posts/:id", isAuthorized, (req, res) => {
  api.delete(req.path).then((resp) => {
    res.send(resp.data);
  });
});

router.post("/posts", isAuthorized, upload.single("file"), async (req, res) => {
  const data = {
    ...req.body,
    imagePath: req.file?.path,
  };
  api.post(req.path, data).then((resp) => {
    res.send(resp.data);
  });
});

router.put(
  "/posts/:id",
  isAuthorized,
  upload.single("file"),
  async (req, res) => {
    console.log("trying to update post");
    const data = {
      ...req.body,
      imagePath: req.file.path,
    };
    api.put(req.path, data).then((resp) => {
      res.send(resp.data);
    });
  }
);

module.exports = router;
