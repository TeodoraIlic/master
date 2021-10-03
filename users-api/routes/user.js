const express = require("express");
const userController = require("../controllers/user");

const router = express.Router();

router.post("/register", userController.createUser);

router.post("/login", userController.signInUser);

module.exports = router;