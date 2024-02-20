function sendFont(req, res) {

  var font = bySlug[req.params.font];

  if (font && font.file) {
    return res.sendFile(font.file);
  }

  res.status(404).send("Cannot GET " + req.baseUrl);

}