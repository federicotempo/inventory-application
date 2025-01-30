const { validationResult, check } = require("express-validator");
const db = require("../db/queries");

async function renderCategories(req, res) {
  try {
    const categories = await db.selectCategories();
    const message = "";
    res.render("categories", { categories, message });
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

async function searchCategories(req, res) {
  const searchTerm = req.query.search || "";
  try {
    const categories = await db.searchCategories(searchTerm);
    const message =
      categories.length === 0 ? "No categories found, please try again." : "";
    res.render("categories", { categories, message });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error searching");
  }
}

async function renderUpdateCategory(req, res) {
  const { id } = req.params;

  try {
    const category = await db.getCategoryById(id);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.render("update_category", { category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving category" });
  }
}

async function updateCategory(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { id } = req.params;
  const { name, description } = req.body;

  try {
    await db.updateCategory(id, {
      name,
      description,
    });
    res.redirect("/categories");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating category");
  }
}

module.exports = {
  renderCategories,
  renderForm,
  addNewCategory,
  validateCategory,
  searchCategories,
  renderUpdateCategory,
  updateCategory,
};
