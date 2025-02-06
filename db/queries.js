const pool = require("./pool");
const { PrismaClient, Prisma } = require("@prisma/client");

const prisma = new PrismaClient();

async function selectCategories({ limit = 3, offset = 0 } = {}) {
  try {
    const categories = await prisma.categories.findMany({
      take: limit,
      skip: offset,
      select: {
        id: true,
        name: true,
        description: true,
      },
      orderBy: {
        id: "asc",
      },
    });
    console.log("Categories selected successfully:", categories);
    return categories;
  } catch (error) {
    console.error("Error selecting categories:", error.message);
    throw error;
  }
}

async function selectItems({ limit = 3, offset = 0 } = {}) {
  try {
    const items = await prisma.items.findMany({
      take: limit,
      skip: offset,
      select: {
        id: true,
        name: true,
        category_id: true,
        price: true,
        quantity: true,
        supplier_id: true,
        created_at: true,
        updated_at: true,
      },
    });
    console.log("Items selected successfully:", items);
    return items;
  } catch (error) {
    console.error("Error selecting items:", error.message);
    throw error;
  }
}

async function selectSuppliers({ limit = 3, offset = 0 } = {}) {
  try {
    const suppliers = await prisma.suppliers.findMany({
      take: limit,
      skip: offset,
      select: {
        id: true,
        name: true,
        contact_phone: true,
        contact_email: true,
      },
      orderBy: {
        id: "asc",
      },
    });

    console.log("Suppliers selected successfully:", suppliers);
    return suppliers;
  } catch (error) {
    console.error("Error selecting suppliers:", error.message);
    throw error;
  }
}

async function insterItem({ name, category_id, supplier_id, price, quantity }) {
  try {
    await prisma.items.create({
      data: {
        name,
        category_id: parseInt(category_id, 10),
        supplier_id: parseInt(supplier_id, 10),
        price: new Prisma.Decimal(price),
        quantity: parseInt(quantity, 10),
      },
    });
    console.log("Item inserted succesfully!");
  } catch (error) {
    console.error("Error inserting item:", error.message);
    throw error;
  }
}

async function insterSupplier({ name, contact_phone, contact_email }) {
  try {
    await prisma.suppliers.create({
      data: { name, contact_phone, contact_email },
    });
    console.log("Supplier inserted succesfully!");
  } catch (error) {
    console.error("Error inserting supplier:", error.message);
    throw error;
  }
}

async function insterCategory({ name, description }) {
  try {
    await prisma.categories.create({
      data: { name, description },
    });
    console.log("Category inserted succesfully!");
  } catch (error) {
    console.error("Error inserting category:", error.message);
    throw error;
  }
}

async function searchItems({ searchTerm, limit = 3, offset = 0 }) {
  try {
    const items = await prisma.items.findMany({
      where: {
        name: {
          contains: searchTerm,
          mode: "insensitive",
        },
      },
      take: limit,
      skip: offset,
      select: {
        id: true,
        name: true,
        category_id: true,
        price: true,
        quantity: true,
        supplier_id: true,
        created_at: true,
        updated_at: true,
      },
    });
    return items;
  } catch (error) {
    console.error("Error searching items:", error.message);
    throw error;
  }
}

async function searchCategories({ searchTerm, limit = 3, offset = 0 }) {
  try {
    const categories = await prisma.categories.findMany({
      where: {
        name: {
          contains: searchTerm,
          mode: "insensitive",
        },
      },
      take: limit,
      skip: offset,
      select: {
        id: true,
        name: true,
        description: true,
      },
      orderBy: {
        id: "asc",
      },
    });
    return categories;
  } catch (error) {
    console.error("Error searching categories:", error.message);
    throw error;
  }
}

async function searchSuppliers({ searchTerm, limit = 3, offset = 0 }) {
  try {
    const suppliers = await prisma.suppliers.findMany({
      where: {
        name: {
          contains: searchTerm,
          mode: "insensitive",
        },
      },
      take: limit,
      skip: offset,
      select: {
        id: true,
        name: true,
        contact_phone: true,
        contact_email: true,
      },
      orderBy: {
        id: "asc",
      },
    });
    return suppliers;
  } catch (error) {
    console.error("Error searching suppliers:", error.message);
    throw error;
  }
}

async function getItemById(id) {
  try {
    const item = await prisma.items.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        id: true,
        name: true,
        price: true,
        quantity: true,
        supplier_id: true,
        category_id: true,
        created_at: true,
        updated_at: true,
      },
    });
    return item;
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
    const updatedItem = await prisma.items.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name: name,
        category_id: parseInt(category_id),
        supplier_id: parseInt(supplier_id),
        price: price,
        quantity: parseInt(quantity),
        updated_at: new Date(),
      },
    });
    return updatedItem;
  } catch (error) {
    console.error("Error updating item", error.message);
    throw error;
  }
}

async function getCategoryById(id) {
  try {
    const category = await prisma.categories.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });
    return category;
  } catch (error) {
    console.error("Error getting category by id", error.message);
    throw error;
  }
}

async function updateCategory(id, { name, description }) {
  try {
    const updatedCategory = await prisma.categories.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name: name,
        description: description,
      },
    });
    return updatedCategory;
  } catch (error) {
    console.error("Error updating category", error.message);
    throw error;
  }
}

async function getSupplierById(id) {
  try {
    const supplier = await prisma.suppliers.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        name: true,
        contact_phone: true,
        contact_email: true,
      },
    });
    return supplier;
  } catch (error) {
    console.error("Error getting supplier by id", error.message);
    throw error;
  }
}

async function updateSupplier(id, { name, contact_phone, contact_email }) {
  try {
    const updatedSupplier = await prisma.suppliers.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name: name,
        contact_phone: contact_phone,
        contact_email: contact_email,
      },
    });
    return updatedSupplier;
  } catch (error) {
    console.error("Error updating supplier", error.message);
    throw error;
  }
}

async function deleteItem(id) {
  try {
    await prisma.items.delete({
      where: {
        id: parseInt(id),
      },
    });
  } catch (error) {
    console.error("Error deleting item", error.message);
    throw error;
  }
}

async function deleteCategory(id) {
  try {
    await prisma.categories.delete({
      where: {
        id: parseInt(id),
      },
    });
  } catch (error) {
    console.error("Error deleting category", error.message);
    throw error;
  }
}

async function deleteSupplier(id) {
  try {
    await prisma.suppliers.delete({
      where: {
        id: parseInt(id),
      },
    });
  } catch (error) {
    console.error("Error deleting supplier", error.message);
    throw error;
  }
}

async function countCategories() {
  try {
    return await pool.query("SELECT COUNT(*) FROM categories");
  } catch (error) {
    console.error("Error counting categories", error.message);
    throw error;
  }
}
async function countSuppliers() {
  try {
    return await pool.query("SELECT COUNT(*) FROM suppliers");
  } catch (error) {
    console.error("Error counting suppliers", error.message);
    throw error;
  }
}

async function countItems() {
  try {
    return await pool.query("SELECT COUNT(*) FROM items");
  } catch (error) {
    console.error("Error counting items", error.message);
    throw error;
  }
}

async function countSearchItems({ searchTerm } = {}) {
  try {
    const query = `
      SELECT COUNT(*) 
      FROM items 
      WHERE name ILIKE $1
    `;
    const values = [`%${searchTerm}%`];
    const result = await pool.query(query, values);
    return result;
  } catch (error) {
    console.error("Error counting search items:", error.message);
    throw error;
  }
}

async function countSearchCategories({ searchTerm } = {}) {
  try {
    const query = `
      SELECT COUNT(*) 
      FROM categories
      WHERE name ILIKE $1
    `;
    const values = [`%${searchTerm}%`];
    const result = await pool.query(query, values);
    return result;
  } catch (error) {
    console.error("Error counting search categories:", error.message);
    throw error;
  }
}

async function countSearchSuppliers({ searchTerm } = {}) {
  try {
    const query = `
      SELECT COUNT(*) 
      FROM suppliers
      WHERE name ILIKE $1
    `;
    const values = [`%${searchTerm}%`];
    const result = await pool.query(query, values);
    return result;
  } catch (error) {
    console.error("Error counting search suppliers:", error.message);
    throw error;
  }
}

async function getAllCategories() {
  try {
    const query = `SELECT id, name, description FROM categories ORDER BY id ASC`;
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error getting all categories:", error.message);
    throw error;
  }
}

async function getAllSuppliers() {
  try {
    const query = `
      SELECT id, name, contact_phone, contact_email 
      FROM suppliers 
      ORDER BY id ASC
    `;
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error getting all suppliers:", error.message);
    throw error;
  }
}

async function insertUser(username, password) {
  try {
    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
      username,
      password,
    ]);
    console.log("User inserted succesfully!");
  } catch (error) {
    console.error("Error creating user", error.message);
    throw error;
  }
}

async function checkUser(username) {
  try {
    const query = `
   SELECT 1 FROM users WHERE username = $1;
  `;

    const result = await pool.query(query, [username]);
    return result.rows.length;
  } catch (error) {
    console.error("Error checking user", error.message);
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
  countCategories,
  countSuppliers,
  countItems,
  countSearchItems,
  getAllCategories,
  getAllSuppliers,
  countSearchCategories,
  countSearchSuppliers,
  insertUser,
  checkUser,
};
