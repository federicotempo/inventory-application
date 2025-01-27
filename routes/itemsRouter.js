const { Router } = require("express");

const itemsRouter = Router();

itemsRouter.get("/");
itemsRouter.post("/");

itemsRouter.get("/:itemId");
itemsRouter.put("/:itemId");

itemsRouter.delete("/:itemId");

module.exports = itemsRouter;
