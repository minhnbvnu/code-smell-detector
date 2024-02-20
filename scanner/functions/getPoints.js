function getPoints() {
  fontPath = font.getPath(typedKey, 0, 0, 200);
  var path = new g.Path(fontPath.commands);
  path = g.resampleByLength(path, 25);
  textW = path.bounds().width;
  // remove all commands without a coordinate
  for (var i = path.commands.length - 1; i >= 0 ; i--) {
    if (path.commands[i].x == undefined) {
      path.commands.splice(i, 1);
    }
  }
  return path.commands;
}