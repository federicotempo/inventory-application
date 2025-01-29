const { validationResult, check } = require("express-validator");
const db = require("../db/queries");

async function renderCategories(req, res) {
  try {
    const categories = await db.selectCategories();
    res.render("categories", { categories });
  } catch (error) {
    console.error("Error displaying categories:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while displaying categories." });
  }
}

function renderForm(req, res) {
  res.render("form_category");
}

validateCategory = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 50 })
    .withMessage("Name cannot be longer than 50"),
  check("description")
    .trim()
    .isLength({ max: 150 })
    .withMessage("Phone number must be between 7 and 15 characters long"),
];

async function addNewCategory(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  try {
    const category = req.body;

    await db.insterCategory(category);
    res.redirect("/categories");
  } catch (error) {
    console.error("Error adding new category:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while adding the category." });
  }
}

module.exports = {
  renderCategories,
  renderForm,
  addNewCategory,
  validateCategory,
};
