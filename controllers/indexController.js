const renderIndex = (req, res) => {
  res.render("index");
};

function renderHome(req, res) {
  res.render("home");
}

module.exports = { renderIndex, renderHome };
