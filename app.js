const express = require("express");
const path = require("node:path");
const session = require("express-session");
const passport = require("passport");
const pgSession = require("connect-pg-simple")(session);
const pool = require("./db/pool");
require("dotenv").config();

const indexRouter = require("./routes/indexRouter");
const categoriesRouter = require("./routes/categoriesRouter");
const suppliersRouter = require("./routes/suppliersRouter");
const itemsRouter = require("./routes/itemsRouter");
const authenticationRouter = require("./routes/authenticationRouter");

const app = express();
const PORT = process.env.PORT || 8000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    store: new pgSession({
      pool: pool,
      tableName: "session",
      createTableIfMissing: true,
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);
app.use(passport.session());

app.use("/", indexRouter);
app.use("/categories", categoriesRouter);
app.use("/suppliers", suppliersRouter);
app.use("/items", itemsRouter);
app.use("/sign-up", authenticationRouter);

app.listen(PORT, () => {
  console.log(`StockFlow is running on http://localhost:${PORT}`);
});
