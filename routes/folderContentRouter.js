import express from "express";
const router = express.Router();

//controller
import folderContentController from "../controllers/folderContentController.js";

// define the home page route
router.get("/:folderId", folderContentController.renderPage);
router.get("/:folderId/new-file", folderContentController.renderFileForm);
router.post("/:folderId/new-file", folderContentController.addFile);

export default router;
