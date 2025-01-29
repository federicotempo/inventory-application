const { Router } = require("express");
const {
  renderItems,
  renderForm,
  addNewItem,
  validateItem,
  searchItems,
} = require("../controllers/itemsController");

const itemsRouter = Router();

itemsRouter.get("/", renderItems);

itemsRouter.get("/new", renderForm);
itemsRouter.post("/new", validateItem, addNewItem);

itemsRouter.get("/search", searchItems);

itemsRouter.get("/:itemId");
itemsRouter.put("/:itemId");

itemsRouter.delete("/:itemId");

module.exports = itemsRouter;
