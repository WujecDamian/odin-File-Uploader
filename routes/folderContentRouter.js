import express from "express";
const router = express.Router();
import multer from "multer";
const upload = multer({ dest: "uploads/" });
//controller
import folderContentController from "../controllers/folderContentController.js";

// define the home page route
router.get("/:folderId", folderContentController.renderPage);
router.get("/:folderId/new-file", folderContentController.renderFileForm);
router.post(
  "/:folderId/new-file",
  upload.single("file"),
  folderContentController.addFile,
);

export default router;
