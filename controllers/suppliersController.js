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

module.exports = { renderSuppliers };
