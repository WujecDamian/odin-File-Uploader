const express = require("express");
const router = express.Router();

//controller
const logInController = require("../controllers/logInController");

// define the home page route
router.get("/", logInController.renderForm);
router.post("/", logInController.logInUser);
module.exports = router;
