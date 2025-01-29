const { Router } = require("express");
const { renderSuppliers, renderForm, addNewSupplier, validateSupplier, searchSuppliers} = require("../controllers/suppliersController");

const suppliersRouter = Router();

suppliersRouter.get("/", renderSuppliers);

suppliersRouter.get("/new", renderForm);
suppliersRouter.post("/new", validateSupplier, addNewSupplier);

suppliersRouter.get("/search", searchSuppliers);


suppliersRouter.get("/:id");
suppliersRouter.put("/:id");

suppliersRouter.delete("/:id");

module.exports = suppliersRouter;
