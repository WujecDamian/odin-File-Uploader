import passport from "passport";

const renderForm = (req, res) => {
  res.render("logIn");
};

const logInUser = (req, res, next) => {
  const auth = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
    failureMessage: true,
  });
  auth(req, res, next);
  //You have to call this as function cause authenticate returns function ((revise))
};

export default { renderForm, logInUser };
