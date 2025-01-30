const { Router } = require("express");
const { renderSuppliers, renderForm, addNewSupplier, validateSupplier, searchSuppliers, renderUpdateSupplier, updateSupplier} = require("../controllers/suppliersController");

const suppliersRouter = Router();

suppliersRouter.get("/", renderSuppliers);

suppliersRouter.get("/new", renderForm);
suppliersRouter.post("/new", validateSupplier, addNewSupplier);

suppliersRouter.get("/search", searchSuppliers);


suppliersRouter.get("/:id/update", renderUpdateSupplier);
suppliersRouter.post("/:id/update", validateSupplier, updateSupplier);

suppliersRouter.delete("/:id");

module.exports = suppliersRouter;
