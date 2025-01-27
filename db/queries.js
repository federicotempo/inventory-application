const pool = require("./pool");

async function selectCategories() {
  try {
    const categories = await pool.query("SELECT * FROM categories");
    console.log("Categories selected successfully:", categories.rows);
    return categories.rows;
  } catch (error) {
    console.error("Error selecting categories:", error.message);
    throw error;
  }
}

async function selectItems() {
  try {
    const items = await pool.query("SELECT * FROM items");
    console.log("Items selected successfully:", items.rows);
    return items.rows;
  } catch (error) {
    console.error("Error selecting items:", error.message);
    throw error;
  }
}

async function selectSuppliers() {
  try {
    const suppliers = await pool.query("SELECT * FROM items");
    console.log("Suppliers selected successfully:", suppliers.rows);
    return suppliers.rows;
  } catch (error) {
    console.error("Error selecting suppliers:", error.message);
    throw error;
  }
}

module.exports = { selectCategories, selectItems, selectSuppliers };
