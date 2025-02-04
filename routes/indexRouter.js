const { Router } = require("express");
const {
  renderIndex,
  renderHome,
  renderSignUpForm,
  createUser,
  validateUser,
} = require("../controllers/indexController");
const passport = require("../config/passport");
const ensureAuthenticated = require("../middlewares/auth");

const indexRouter = Router();

indexRouter.get("/", renderIndex);

indexRouter.get("/home", ensureAuthenticated, renderHome);

indexRouter.get("/sign-up", renderSignUpForm);
indexRouter.post("/sign-up", validateUser, createUser);

indexRouter.get("/log-in", (req, res) => {
  res.render("log-in", {
    user: req.user,
    messages: req.flash("error"),
  });
});
indexRouter.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/log-in",
    failureFlash: true,
  })
);

indexRouter.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/log-in");
  });
});

module.exports = indexRouter;
