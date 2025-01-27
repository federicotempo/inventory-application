const { Router } = require("express");
const itemsRouter = require("./itemsRouter")

const categoriesRouter = Router();

categoriesRouter.get("/");
categoriesRouter.post("/");

categoriesRouter.get("/:id");
categoriesRouter.put("/:id");

categoriesRouter.delete("/:id");

categoriesRouter.use("/:id/items", itemsRouter);

module.exports = categoriesRouter;
