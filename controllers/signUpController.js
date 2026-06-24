import { prisma } from "../lib/prisma.js";
import bcrypt from "bcryptjs";

const renderForm = (req, res) => {
  res.render("signUp");
};

const signUp = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await prisma.user.create({
      data: {
        fullname: req.body.fullname,
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword,
      },
    });
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
};

export default { renderForm, signUp };
