function normalizeOpts(options) {
  var defaultOpts = {
    defaultWidth: 0,
    output: process.stdout,
    tty: __webpack_require__(104)
  };

  if (!options) {
    return defaultOpts;
  } else {
    Object.keys(defaultOpts).forEach(function (key) {
      if (!options[key]) {
        options[key] = defaultOpts[key];
      }
    });

    return options;
  }
}