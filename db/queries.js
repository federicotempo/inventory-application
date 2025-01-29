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
    const suppliers = await pool.query("SELECT * FROM suppliers");
    console.log("Suppliers selected successfully:", suppliers.rows);
    return suppliers.rows;
  } catch (error) {
    console.error("Error selecting suppliers:", error.message);
    throw error;
  }
}

async function insterItem({ name, category_id, supplier_id, price, quantity }) {
  try {
    await pool.query(
      "INSERT INTO items (name, category_id, supplier_id, price, quantity) VALUES ($1, $2, $3, $4, $5)",
      [name, category_id, supplier_id, price, quantity]
    );
    console.log("Item inserted succesfully!");
  } catch (error) {
    console.error("Error inserting item:", error.message);
    throw error;
  }
}

async function insterSupplier({ name, contact_phone, contact_email }) {
  try {
    await pool.query(
      "INSERT INTO suppliers (name, contact_phone, contact_email) VALUES ($1, $2, $3)",
      [name, contact_phone, contact_email]
    );
    console.log("Supplier inserted succesfully!");
  } catch (error) {
    console.error("Error inserting supplier:", error.message);
    throw error;
  }
}

async function insterCategory({ name, description }) {
  try {
    await pool.query(
      "INSERT INTO categories (name, description) VALUES ($1, $2)",
      [name, description]
    );
    console.log("Category inserted succesfully!");
  } catch (error) {
    console.error("Error inserting category:", error.message);
    throw error;
  }
}

async function searchItems(searchTerm) {
  try {
    const result = await pool.query("SELECT * FROM items WHERE name ILIKE $1", [
      `%${searchTerm}%`,
    ]);
    return result.rows;
  } catch (error) {
    console.error("Error searching items:", error.message);
    throw error;
  }
}

async function searchCategories(searchTerm) {
  try {
    const result = await pool.query("SELECT * FROM categories WHERE name ILIKE $1", [
      `%${searchTerm}%`,
    ]);
    return result.rows;
  } catch (error) {
    console.error("Error searching categories:", error.message);
    throw error;
  }
}

async function searchSuppliers(searchTerm) {
  try {
    const result = await pool.query("SELECT * FROM suppliers WHERE name ILIKE $1", [
      `%${searchTerm}%`,
    ]);
    return result.rows;
  } catch (error) {
    console.error("Error searching suppliers:", error.message);
    throw error;
  }
}

module.exports = {
  selectCategories,
  selectItems,
  selectSuppliers,
  insterItem,
  insterSupplier,
  insterCategory,
  searchItems,
  searchCategories,
  searchSuppliers,
};
