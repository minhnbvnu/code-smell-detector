function parsePackageName(input) {
  var _PKG_INPUT$exec = PKG_INPUT.exec(input);

  const name = _PKG_INPUT$exec[1],
        version = _PKG_INPUT$exec[2];

  return { name, version };
}