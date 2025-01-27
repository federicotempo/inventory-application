const { Router } = require("express");
const { renderIndex, renderHome } = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/", renderIndex);
indexRouter.get("/home", renderHome);

module.exports = indexRouter;