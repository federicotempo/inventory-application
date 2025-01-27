const renderIndex = (req, res) => {
  res.render("index");
};

async function renderHome(req, res) {
  res.render("home");
}

module.exports = { renderIndex, renderHome };
