const { Router } = require("express");
const {
  renderCategories,
  renderForm,
  validateCategory,
  addNewCategory,
  searchCategories,
  renderUpdateCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoriesController");

const categoriesRouter = Router();

categoriesRouter.get("/", renderCategories);

categoriesRouter.get("/new", renderForm);
categoriesRouter.post("/new", validateCategory, addNewCategory);

categoriesRouter.get("/search", searchCategories);

categoriesRouter.get("/:id/update", renderUpdateCategory);
categoriesRouter.post("/:id/update", validateCategory, updateCategory);

categoriesRouter.post("/:id/delete", deleteCategory);

module.exports = categoriesRouter;
