const { Router } = require("express");
const { renderItems } = require("../controllers/itemsController");

const itemsRouter = Router();

itemsRouter.get("/", renderItems);
itemsRouter.post("/");

itemsRouter.get("/:itemId");
itemsRouter.put("/:itemId");

itemsRouter.delete("/:itemId");

module.exports = itemsRouter;
