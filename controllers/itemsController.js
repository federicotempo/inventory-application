const { validationResult, check } = require("express-validator");
const db = require("../db/queries");

async function renderItems(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const offset = (page - 1) * limit;

    const items = await db.selectItems({ limit, offset });
    const categories = await db.selectCategories();
    const suppliers = await db.selectSuppliers();

    const totalResult = await db.countItems();
    const totalCategories = parseInt(totalResult.rows[0].count);
    const totalPages = Math.ceil(totalCategories / limit);

    const message = "";

    res.render("items", {
      items,
      categories,
      suppliers,
      message,
      page,
      totalPages,
      user: req.user,
    });
  } catch (error) {
    console.error("Error displaying items:", error.message);
    res.status(500).json({ error: "An error occurred while displaying items" });
  }
}

async function renderForm(req, res) {
  try {
    const categories = await db.selectCategories();
    const suppliers = await db.selectSuppliers();

    res.render("form_item", { categories, suppliers });
  } catch (error) {
    console.error("Error displaying form_item", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while displaying item's form" });
  }
}

validateItem = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 125 })
    .withMessage("Name cannot be longer than 125"),
  check("category_id")
    .isInt({ gt: 0 })
    .withMessage("Category is required and must be a valid ID"),
  check("supplier_id")
    .isInt({ gt: 0 })
    .withMessage("Supplier is required and must be a valid ID"),
  check("price")
    .trim()
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number")
    .custom((value) => {
      if (!/^\d+(\.\d{1,2})?$/.test(value)) {
        throw new Error("Price must have at most two decimal places");
      }
      return true;
    }),
  check("quantity")
    .trim()
    .isInt({ gt: 0 })
    .withMessage("Quantity must be a positive integer"),
];

async function addNewItem(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  try {
    const item = req.body;

    await db.insterItem(item);
    res.redirect("/items");
  } catch (error) {
    console.error("Error adding new item:", error.message);
    res.status(500).json({ error: "An error occurred while adding the item." });
  }
}

async function searchItems(req, res) {
  const searchTerm = req.query.search || "";

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 3;
  const offset = (page - 1) * limit;

  const categories = await db.getAllCategories();
  const suppliers = await db.getAllSuppliers();
  try {
    const items = await db.searchItems({ searchTerm, limit, offset });

    const totalResult = await db.countSearchItems({ searchTerm });
    const totalItems = parseInt(totalResult.rows[0].count);
    const totalPages = Math.ceil(totalItems / limit);

    const message =
      items.length === 0 ? "No items found, please try again." : "";
    res.render("search_items", {
      items,
      categories,
      suppliers,
      message,
      page,
      totalPages,
      searchTerm,
      user: req.user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error searching" });
  }
}

async function renderUpdateItem(req, res) {
  const { id } = req.params;
  const categories = await db.selectCategories();
  const suppliers = await db.selectSuppliers();

  try {
    const item = await db.getItemById(id);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.render("update_item", { item, categories, suppliers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving item" });
  }
}

async function updateItem(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  const { id } = req.params;
  const { name, category_id, supplier_id, price, quantity } = req.body;

  try {
    await db.updateItem(id, {
      name,
      category_id,
      supplier_id,
      price,
      quantity,
    });
    res.redirect("/items");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating item" });
  }
}

async function deleteItem(req, res) {
  const { id } = req.params;

  try {
    await db.deleteItem(id);
    res.redirect("/items");
  } catch (error) {
    console.error("Error deleting item:", error.message);
    res.status(500).json({ error: "Error deleting item" });
  }
}

module.exports = {
  renderItems,
  renderForm,
  addNewItem,
  searchItems,
  renderUpdateItem,
  validateItem,
  updateItem,
  deleteItem,
};
