import { prisma } from "../lib/prisma.js";

const renderPage = async (req, res) => {
  const files = await prisma.file.findMany({
    where: { folderId: Number(req.params.folderId) },
  });
  console.log(files);
  res.render("folderContent", { files, folderId: req.params.folderId });
};

const renderFileForm = async (req, res) => {
  res.render("newFile", { folderId: req.params.folderId });
};

const addFile = async (req, res, next) => {
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

export default { renderPage, renderFileForm, addFile };
