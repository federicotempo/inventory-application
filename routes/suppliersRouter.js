const { Router } = require("express");
const {
  renderSuppliers,
  renderForm,
  addNewSupplier,
  validateSupplier,
  searchSuppliers,
  renderUpdateSupplier,
  updateSupplier,
  deleteSupplier,
} = require("../controllers/suppliersController");
const ensureAuthenticated = require("../middlewares/auth");

const suppliersRouter = Router();

suppliersRouter.get("/", ensureAuthenticated, renderSuppliers);

suppliersRouter.get("/new", ensureAuthenticated, renderForm);
suppliersRouter.post("/new", validateSupplier, addNewSupplier);

suppliersRouter.get("/search", ensureAuthenticated, searchSuppliers);

suppliersRouter.get("/:id/update", ensureAuthenticated, renderUpdateSupplier);
suppliersRouter.post("/:id/update", validateSupplier, updateSupplier);

suppliersRouter.post("/:id/delete", deleteSupplier);

module.exports = suppliersRouter;
