const { Router } = require("express");
const { renderIndex, renderHome } = require("../controllers/indexController");
const {
  renderSignUpForm,
  createUser,
  validateUser,
} = require("../controllers/authenticationController");
const passport = require("../config/passport");

const indexRouter = Router();

indexRouter.get("/", renderIndex);

indexRouter.get("/home", renderHome);

indexRouter.get("/sign-up", renderSignUpForm);
indexRouter.post("/sign-up", validateUser, createUser);

indexRouter.get("/log-in", (req, res) => {
  res.render("log-in", { user: req.user });
});
indexRouter.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);

indexRouter.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = indexRouter;
