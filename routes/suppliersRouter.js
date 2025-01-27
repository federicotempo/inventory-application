const { Router } = require("express");
const { renderSuppliers } = require("../controllers/suppliersController");

const suppliersRouter = Router();

suppliersRouter.get("/", renderSuppliers);
suppliersRouter.post("/");

suppliersRouter.get("/:id");
suppliersRouter.put("/:id");

suppliersRouter.delete("/:id");

module.exports = suppliersRouter;
