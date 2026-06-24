import express from "express";
const router = express.Router();

//controller
import indexController from "../controllers/indexController.js";

// define the home page route
router.get("/", indexController.renderIndex);

export default router;
