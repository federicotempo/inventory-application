const { Router } = require("express");
const itemsRouter = require("./itemsRouter")
const { renderCategories } = require("../controllers/categoriesController")
const categoriesRouter = Router();

categoriesRouter.get("/", renderCategories);
categoriesRouter.post("/");

categoriesRouter.get("/:id");
categoriesRouter.put("/:id");

categoriesRouter.delete("/:id");

categoriesRouter.use("/:id/items", itemsRouter);

module.exports = categoriesRouter;
