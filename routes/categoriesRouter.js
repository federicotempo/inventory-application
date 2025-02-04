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
const ensureAuthenticated = require("../middlewares/auth");

const categoriesRouter = Router();

categoriesRouter.get("/", ensureAuthenticated, renderCategories);

categoriesRouter.get("/new", ensureAuthenticated, renderForm);
categoriesRouter.post("/new", validateCategory, addNewCategory);

categoriesRouter.get("/search", ensureAuthenticated, searchCategories);

categoriesRouter.get("/:id/update", ensureAuthenticated ,renderUpdateCategory);
categoriesRouter.post("/:id/update", validateCategory, updateCategory);

categoriesRouter.post("/:id/delete", deleteCategory);

module.exports = categoriesRouter;
