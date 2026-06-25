import { prisma } from "../lib/prisma.js";

const renderPage = async (req, res) => {
  const files = await prisma.file.findUnique({
    where: { id: Number(req.params.folderId) },
  });
  res.render("folderContent", { files, folderId: req.params.folderId });
};

const renderFileForm = async (req, res) => {
  res.render("newFile");
};

const addFile = async (req, res, next) => {
  try {
    await prisma.file.create({
      data: {
        folder_name: req.body.folderName,
        userId: res.locals.currentUser.id,
      },
    });
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
};

export default { renderPage, renderFileForm, addFile };
