const { Router } = require("express");
const {
  renderCategories,
  renderForm,
  validateCategory,
  addNewCategory,
} = require("../controllers/categoriesController");

const categoriesRouter = Router();

categoriesRouter.get("/", renderCategories);

categoriesRouter.get("/new", renderForm);
categoriesRouter.post("/new", validateCategory, addNewCategory);

// categoriesRouter.get("/:id");
// categoriesRouter.put("/:id");

// categoriesRouter.delete("/:id");

module.exports = categoriesRouter;
