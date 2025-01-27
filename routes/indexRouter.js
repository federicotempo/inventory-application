const { Router } = require("express");
const { renderIndex } = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/", renderIndex);

module.exports = indexRouter;