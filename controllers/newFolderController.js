import { prisma } from "../lib/prisma.js";
import bcrypt from "bcryptjs";

const renderForm = (req, res) => {
  res.render("newFolder");
};

const createFolder = async (req, res, next) => {
  try {
    await prisma.folder.create({
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

export default { renderForm, createFolder };
