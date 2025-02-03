const { insertUser } = require("../db/queries");
const { validationResult, check } = require("express-validator");
const bcrypt = require("bcryptjs");

const renderIndex = (req, res) => {
  res.render("index");
};

function renderHome(req, res) {
  res.render("home");
}

const validateUser = [
  check("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 4, max: 20 })
    .withMessage("Username must be between 4 and 20 characters long")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username can only contain letters, numbers, and underscores"),
  check("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8, max: 20 })
    .withMessage("Username must be between 8 and 20 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/\d/)
    .withMessage("Password must contain at least one number")
    .matches(/[\W_]/)
    .withMessage("Password must contain at least one special character"),
];

const renderSignUpForm = (req, res) => {
  res.render("sign_up_form");
};

async function createUser(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  try {
    const username = req.body.username;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await insertUser(username, hashedPassword);
    res.redirect("/home");
  } catch (error) {
    console.error("Error creating new user:", error.message);
    res.status(500).json({ error: "An error occurred while adding the user." });
  }
}

module.exports = {
  renderIndex,
  renderHome,
  renderSignUpForm,
  createUser,
  validateUser,
};
