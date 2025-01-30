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

const itemsRouter = Router();

itemsRouter.get("/", renderItems);

itemsRouter.get("/new", renderForm);
itemsRouter.post("/new", validateItem, addNewItem);

itemsRouter.get("/search", searchItems);

itemsRouter.get("/:id/update", renderUpdateItem);
itemsRouter.post("/:id/update", validateItem, updateItem);

itemsRouter.post("/:id/delete", deleteItem);

module.exports = itemsRouter;
