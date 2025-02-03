const { Router } = require("express");
const { renderSignUpForm, createUser, validateUser } = require("../controllers/authenticationController");

const authenticationRouter = Router();

authenticationRouter.get("/", renderSignUpForm);

authenticationRouter.post("/", validateUser, createUser);

module.exports = authenticationRouter;
