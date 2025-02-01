const { Router } = require("express");

const authenticationRouter = Router();

authenticationRouter.get("/", (req, res) => {
  res.render("sign_up_form");
});

module.exports = authenticationRouter;
