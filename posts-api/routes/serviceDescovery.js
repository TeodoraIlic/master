const express = require("express");
const postController = require("../controllers/post");
const router = express.Router();

router.get('/:serviceName', postController.findPostByServiceName);

module.exports = router;