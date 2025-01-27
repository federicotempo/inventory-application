const express = require("express");
const path = require("node:path");
const indexRouter = require("./routes/indexRouter");
const categoriesRouter = require("./routes/categoriesRouter");
const suppliersRouter = require("./routes/suppliersRouter");

const app = express();
const PORT = process.env.PORT || 8000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/categories", categoriesRouter);
app.use("/suppliers", suppliersRouter);

app.listen(PORT, () => {
  console.log(`SteelHub is running on http://localhost:${PORT}`);
});
