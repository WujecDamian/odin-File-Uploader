import express from "express";
const router = express.Router();

//controller
import signUpController from "../controllers/signUpController.js";

// define the home page route
router.get("/", signUpController.renderForm);
router.post("/", signUpController.signUp);
export default router;
