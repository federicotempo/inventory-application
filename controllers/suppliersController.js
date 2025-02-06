const { check, validationResult } = require("express-validator");
const db = require("../db/queries");

async function renderSuppliers(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const offset = (page - 1) * limit;

    const suppliers = await db.selectSuppliers({ limit, offset });

    const totalSuppliers = await db.countSuppliers();
    const totalPages = Math.ceil(totalSuppliers / limit);

    const message = "";

    res.render("suppliers", {
      suppliers,
      message,
      page,
      totalPages,
      user: req.user,
    });
  } catch (error) {
    console.error("Error displaying suppliers:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while displaying suppliers." });
  }
}

function renderForm(req, res) {
  res.render("form_supplier", { user: req.user });
}

validateSupplier = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 50 })
    .withMessage("Name cannot be longer than 50"),
  check("contact_phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .isLength({ min: 7, max: 15 })
    .withMessage("Phone number must be between 7 and 15 characters long")
    .matches(/^[0-9+\-() ]+$/)
    .withMessage(
      'Phone number can only contain digits, spaces, dashes, parentheses, and the "+" sign'
    ),
  check("contact_email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .isLength({ max: 75 })
    .withMessage("Email must be at most 75 characters long")
    .normalizeEmail(),
];

async function addNewSupplier(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  try {
    const supplier = req.body;

    await db.insterSupplier(supplier);
    res.redirect("/suppliers");
  } catch (error) {
    console.error("Error adding new supplier:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while adding the supplier." });
  }
}

async function searchSuppliers(req, res) {
  const searchTerm = req.query.search || "";

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 3;
  const offset = (page - 1) * limit;

  try {
    const suppliers = await db.searchSuppliers({ searchTerm, page, offset });

    const totalResult = await db.countSearchSuppliers({ searchTerm });
    const totalSuppliers = parseInt(totalResult.rows[0].count);
    const totalPages = Math.ceil(totalSuppliers / limit);

    const message =
      suppliers.length === 0 ? "No suppliers found, please try again." : "";
    res.render("search_suppliers", {
      suppliers,
      message,
      page,
      totalPages,
      searchTerm,
      user: req.user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error searching");
  }
}

async function renderUpdateSupplier(req, res) {
  const { id } = req.params;

  try {
    const supplier = await db.getSupplierById(id);

    if (!supplier) {
      return res.status(404).json({ error: "Supplier not found" });
    }

    res.render("update_supplier", { supplier, user: req.user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving supplier" });
  }
}

async function updateSupplier(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { id } = req.params;
  const { name, contact_phone, contact_email } = req.body;

  try {
    await db.updateSupplier(id, {
      name,
      contact_phone,
      contact_email,
    });
    res.redirect("/suppliers");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating supplier" });
  }
}

async function deleteSupplier(req, res) {
  const { id } = req.params;

  try {
    await db.deleteSupplier(id);
    res.redirect("/suppliers");
  } catch (error) {
    console.error("Error deleting supplier:", error.message);
    res.status(500).json({ error: "Error deleting supplier" });
  }
}

module.exports = {
  renderSuppliers,
  renderForm,
  validateSupplier,
  addNewSupplier,
  searchSuppliers,
  renderUpdateSupplier,
  updateSupplier,
  deleteSupplier,
};
