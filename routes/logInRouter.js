import express from "express";
const router = express.Router();

//controller
import logInController from "../controllers/logInController.js";

// define the home page route
router.get("/", logInController.renderForm);
router.post("/", logInController.logInUser);
export default router;
