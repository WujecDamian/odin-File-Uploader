import express from "express";
const router = express.Router();
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import path from "path";
import { prisma } from "../lib/prisma.js";
import "dotenv/config";

const fileFilter = (req, file, callback) => {
  const blockedExtensions = [".exe", ".sh", ".bat", ".cmd"];
  const ext = path.extname(file.originalname).toLowerCase();

  if (blockedExtensions.includes(ext)) {
    // reject the file
    return callback(new Error("File type not allowed!"), false);
  }

  // accept the file
  callback(null, true);
};
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "5xDrive",
    resource_type: "raw",
    fieldname: (req, file) => `${file.originalname}`,
    public_id: (req, file) => `${file.originalname}-${Date.now()}`,
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 25000000 },
  fileFilter: fileFilter,
}); //max 25MB filesize
//controller
import folderContentController from "../controllers/folderContentController.js";
import fileInfoController from "../controllers/fileInfoController.js";

// define the home page route
router.get("/:folderId", folderContentController.renderPage);
router.get("/:folderId/new-file", folderContentController.renderFileForm);
router.post(
  "/:folderId/new-file",
  upload.single("file"),
  folderContentController.addFile,
);
router.post("/:folderId/rename", folderContentController.renameFolder);
router.post("/:folderId/delete", folderContentController.deleteFolder);

//file contents
router.get("/:folderId/file/:fileId", fileInfoController.renderPage);

export default router;
