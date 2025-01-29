const { check, validationResult } = require("express-validator");
const db = require("../db/queries");

async function renderSuppliers(req, res) {
  try {
    const suppliers = await db.selectSuppliers();
    res.render("suppliers", { suppliers });
  } catch (error) {
    console.error("Error displaying suppliers:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while displaying suppliers." });
  }
}

function renderForm(req, res) {
  res.render("form_supplier");
}

validateSupplier = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 50 })
    .withMessage("Name cannot be longer than 50"),
  check("contact_phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .isLength({ min: 7, max: 15 })
    .withMessage("Phone number must be between 7 and 15 characters long")
    .matches(/^[0-9+\-() ]+$/)
    .withMessage(
      'Phone number can only contain digits, spaces, dashes, parentheses, and the "+" sign'
    ),
  check("contact_email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .isLength({ max: 75 })
    .withMessage("Email must be at most 75 characters long")
    .normalizeEmail(),
];

async function addNewSupplier(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  try {
    const supplier = req.body;

    await db.insterSupplier(supplier);
    res.redirect("/suppliers");
  } catch (error) {
    console.error("Error adding new supplier:", error.message);
    res.status(500).json({ error: "An error occurred while adding the supplier." });
  }
}

module.exports = {
  renderSuppliers,
  renderForm,
  validateSupplier,
  addNewSupplier,
};
