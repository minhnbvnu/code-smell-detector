function sendJS(req, res) {
  res.set("Content-Type", "application/javascript")
    .send("(function(){\n\n" + fonts.map(shim).join("\n\n") + "\n\n})();");
}