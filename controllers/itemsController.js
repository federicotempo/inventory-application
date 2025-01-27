const db = require("../db/queries");

async function renderItems(req, res) {
  try {
    const items = await db.selectItems();
    const categories = await db.selectCategories();
    const suppliers = await db.selectSuppliers();

    res.render("items", { items, categories, suppliers });
  } catch (error) {
    console.error("Error displaying items:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while displaying items" });
  }
}

module.exports = { renderItems };
