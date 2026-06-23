const express = require("express");
const router = express.Router();

//controller
const indexController = require("../controllers/indexController");

// define the home page route
router.get("/", indexController.renderIndex);

module.exports = router;
