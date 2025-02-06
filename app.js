const express = require("express");
const path = require("node:path");
const expressSession = require("express-session");
const passport = require("./config/passport");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");
const flash = require("connect-flash");
require("dotenv").config();

const prisma = new PrismaClient();

const indexRouter = require("./routes/indexRouter");
const categoriesRouter = require("./routes/categoriesRouter");
const suppliersRouter = require("./routes/suppliersRouter");
const itemsRouter = require("./routes/itemsRouter");

const app = express();
const PORT = process.env.PORT || 8000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    },
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000, 
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use("/", indexRouter);
app.use("/categories", categoriesRouter);
app.use("/suppliers", suppliersRouter);
app.use("/items", itemsRouter);

app.listen(PORT, () => {
  console.log(`StockFlow is running on http://localhost:${PORT}`);
});
