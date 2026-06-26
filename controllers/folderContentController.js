import { prisma } from "../lib/prisma.js";

const renderPage = async (req, res) => {
  const files = await prisma.file.findMany({
    where: { folderId: Number(req.params.folderId) },
  });
  const folder = await prisma.folder.findUnique({
    where: {
      id: Number(req.params.folderId),
    },
  });
  res.render("folderContent", { files, folderId: req.params.folderId, folder });
};

const renderFileForm = async (req, res) => {
  res.render("newFile", { folderId: req.params.folderId });
};

const addFile = async (req, res, next) => {
  console.log(req.file);
  try {
    await prisma.file.create({
      data: {
        file_size: req.file.size,
        file_url: req.file.path,
        filename: req.file.originalname,
        folderId: Number(req.params.folderId),
      },
    });
    res.redirect(`/folder/${Number(req.params.folderId)}`);
  } catch (err) {
    return next(err);
  }
};

const renameFolder = async (req, res, next) => {
  try {
    await prisma.folder.update({
      where: { id: Number(req.params.folderId) },
      data: { folder_name: req.body.folderName },
    });
    res.redirect(`/folder/${Number(req.params.folderId)}`);
  } catch (err) {
    return next(err);
  }
};
const deleteFolder = async (req, res, next) => {
  try {
    await prisma.file.deleteMany({
      where: { folderId: Number(req.params.folderId) },
    });
    await prisma.folder.delete({
      where: { id: Number(req.params.folderId) },
    });
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
};
export default {
  renderPage,
  renderFileForm,
  addFile,
  renameFolder,
  deleteFolder,
};
