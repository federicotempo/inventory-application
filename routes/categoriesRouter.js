const { Router } = require("express");
const {
  renderCategories,
  renderForm,
  validateCategory,
  addNewCategory,
  searchCategories,
} = require("../controllers/categoriesController");

const categoriesRouter = Router();

categoriesRouter.get("/", renderCategories);

categoriesRouter.get("/new", renderForm);
categoriesRouter.post("/new", validateCategory, addNewCategory);

categoriesRouter.get("/search", searchCategories);


// categoriesRouter.get("/:id");
// categoriesRouter.put("/:id");

// categoriesRouter.delete("/:id");

module.exports = categoriesRouter;
