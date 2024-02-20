function sendCSS(req, res) {
  res.set("Content-Type", "text/css")
    .send(fonts.map(declaration).join("\n\n"));
}