const { Router } = require("express");
const {
  renderItems,
  renderForm,
  addNewItem,
  validateItem,
  searchItems,
  updateItem,
  renderUpdateItem,
  deleteItem,
} = require("../controllers/itemsController");
const ensureAuthenticated = require("../middlewares/auth");

const itemsRouter = Router();

itemsRouter.get("/", ensureAuthenticated, renderItems);

itemsRouter.get("/new", ensureAuthenticated, renderForm);
itemsRouter.post("/new", validateItem, addNewItem);

itemsRouter.get("/search", ensureAuthenticated, searchItems);

itemsRouter.get("/:id/update", ensureAuthenticated, renderUpdateItem);
itemsRouter.post("/:id/update", validateItem, updateItem);

itemsRouter.post("/:id/delete", deleteItem);

module.exports = itemsRouter;
