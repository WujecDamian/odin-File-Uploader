import express from "express";
const router = express.Router();

//controller
import logOutController from "../controllers/logOutController.js";

// define the home page route
router.get("/", logOutController.logOut);
export default router;
