const { Router } = require("express");
const {
  renderItems,
  renderForm,
  addNewItem,
  validateItem,
  searchItems,
  updateItem,
  renderUpdateItem,
} = require("../controllers/itemsController");

const itemsRouter = Router();

itemsRouter.get("/", renderItems);

itemsRouter.get("/new", renderForm);
itemsRouter.post("/new", validateItem, addNewItem);

itemsRouter.get("/search", searchItems);

itemsRouter.get("/:id/update", renderUpdateItem);
itemsRouter.post("/:id/update", validateItem, updateItem);

module.exports = itemsRouter;
