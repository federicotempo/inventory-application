const db = require("../db/queries");

async function renderItems(req, res) {
  try {
    const items = await db.selectItems();
    const categories = await db.selectCategories();
    res.render("items", { items, categories });
  } catch (error) {
    console.error("Error displaying items:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while displaying items" });
  }
}

module.exports = { renderItems };
