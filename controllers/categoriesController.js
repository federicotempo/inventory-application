const db = require("../db/queries");

async function renderCategories(req, res) {
  try {
    const categories = await db.selectCategories();
    res.render("categories", {categories})
  } catch (error) {
    console.error("Error displaying categories:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while displaying categories." });
  }
}

module.exports = { renderCategories };
