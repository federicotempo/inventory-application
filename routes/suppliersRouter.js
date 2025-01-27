const { Router } = require("express");

const suppliersRouter = Router();

suppliersRouter.get("/");
suppliersRouter.post("/");

suppliersRouter.get("/:id")
suppliersRouter.put("/:id")

suppliersRouter.delete("/:id")

module.exports = suppliersRouter;
