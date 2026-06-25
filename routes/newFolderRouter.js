import express from "express";
const router = express.Router();

//controller
import newFolderController from "../controllers/newFolderController.js";

// define the home page route
router.get("/", newFolderController.renderForm);
router.post("/", newFolderController.createFolder);
export default router;
