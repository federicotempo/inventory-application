const pool = require("./pool");

async function selectCategories() {
  try {
    const categories = await pool.query(
      "SELECT id, name, description FROM categories ORDER BY id ASC"
    );
    console.log("Categories selected successfully:", categories.rows);
    return categories.rows;
  } catch (error) {
    console.error("Error selecting categories:", error.message);
    throw error;
  }
}

async function selectItems() {
  try {
    const items = await pool.query(
      "SELECT id, name, category_id, price, quantity, supplier_id, created_at, updated_at FROM items ORDER BY id ASC"
    );
    console.log("Items selected successfully:", items.rows);
    return items.rows;
  } catch (error) {
    console.error("Error selecting items:", error.message);
    throw error;
  }
}

async function selectSuppliers() {
  try {
    const suppliers = await pool.query(
      "SELECT id, name, contact_phone, contact_email FROM suppliers ORDER BY id ASC"
    );
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
    const result = await pool.query("SELECT name, category_id, price, quantity, supplier_id, created_at, updated_at FROM items WHERE name ILIKE $1", [
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
    const result = await pool.query(
      "SELECT name, description FROM categories WHERE name ILIKE $1",
      [`%${searchTerm}%`]
    );
    return result.rows;
  } catch (error) {
    console.error("Error searching categories:", error.message);
    throw error;
  }
}

async function searchSuppliers(searchTerm) {
  try {
    const result = await pool.query(
      "SELECT name, contact_phone, contact_email FROM suppliers WHERE name ILIKE $1",
      [`%${searchTerm}%`]
    );
    return result.rows;
  } catch (error) {
    console.error("Error searching suppliers:", error.message);
    throw error;
  }
}

async function getItemById(id) {
  try {
    const result = await pool.query("SELECT id, name, price, quantity, supplier_id, category_id, created_at, updated_at FROM items WHERE id = $1", [id]);
    return result.rows[0];
  } catch (error) {
    console.error("Error getting item by id", error.message);
    throw error;
  }
}

async function updateItem(
  id,
  { name, category_id, supplier_id, price, quantity }
) {
  try {
    await pool.query(
      `
      UPDATE items SET name = $1, category_id = $2, supplier_id = $3, price = $4, quantity = $5, updated_at = NOW()
      WHERE id = $6`,
      [name, category_id, supplier_id, price, quantity, id]
    );
  } catch (error) {
    console.error("Error updating item", error.message);
    throw error;
  }
}

async function getCategoryById(id) {
  try {
    const result = await pool.query("SELECT name, description FROM categories WHERE id = $1", [
      id,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error getting category by id", error.message);
    throw error;
  }
}

async function updateCategory(id, { name, description }) {
  try {
    await pool.query(
      `
      UPDATE categories SET name = $1, description = $2, updated_at = NOW()
      WHERE id = $3`,
      [name, description, id]
    );
  } catch (error) {
    console.error("Error updating category", error.message);
    throw error;
  }
}

async function getSupplierById(id) {
  try {
    const result = await pool.query("SELECT name, contact_phone, contact_email FROM suppliers WHERE id = $1", [
      id,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error getting supplier by id", error.message);
    throw error;
  }
}

async function updateSupplier(id, { name, contact_phone, contact_email }) {
  try {
    await pool.query(
      `
      UPDATE suppliers SET name = $1, contact_phone = $2, contact_email = $3, updated_at = NOW()
      WHERE id = $4`,
      [name, contact_phone, contact_email, id]
    );
  } catch (error) {
    console.error("Error updating supplier", error.message);
    throw error;
  }
}

async function deleteItem(id) {
  try {
    await pool.query("DELETE FROM items WHERE id = $1", [id]);
  } catch (error) {
    console.error("Error deleting item", error.message);
    throw error;
  }
}

async function deleteCategory(id) {
  try {
    await pool.query("DELETE FROM categories WHERE id = $1", [id]);
  } catch (error) {
    console.error("Error deleting category", error.message);
    throw error;
  }
}

async function deleteSupplier(id) {
  try {
    await pool.query("DELETE FROM suppliers WHERE id = $1", [id]);
  } catch (error) {
    console.error("Error deleting supplier", error.message);
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
  getItemById,
  updateItem,
  getCategoryById,
  updateCategory,
  getSupplierById,
  updateSupplier,
  deleteItem,
  deleteCategory,
  deleteSupplier,
};
