const express = require("express");

const authController = require("../controllers/auth.controller");

const router = express.Router();

router.route("/signup").post(authController.signUp);

module.exports = router;
