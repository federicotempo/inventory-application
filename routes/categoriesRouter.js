const { Router } = require("express");
const { renderCategories } = require("../controllers/categoriesController")

const categoriesRouter = Router();

categoriesRouter.get("/", renderCategories);
categoriesRouter.post("/");

categoriesRouter.get("/:id");
categoriesRouter.put("/:id");

categoriesRouter.delete("/:id");


module.exports = categoriesRouter;
