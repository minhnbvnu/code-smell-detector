function styleFactory(name) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$getStyles = _ref.getStyles,
      getStyles = _ref$getStyles === void 0 ? function () {
    return '';
  } : _ref$getStyles,
      _ref$pickValues = _ref.pickValues,
      pickValues = _ref$pickValues === void 0 ? function (t) {
    return t;
  } : _ref$pickValues,
      _ref$defaultTheme = _ref.defaultTheme,
      defaultTheme = _ref$defaultTheme === void 0 ? {} : _ref$defaultTheme;

  var counter = 0;
  var insertedKey = null;
  var node = null;

  function injectStyle(content) {
    try {
      node = document.createElement('style');
      node.id = "".concat(name, "-").concat(++counter);
      node.innerHTML = content;
      document.head.appendChild(node);
    } catch (e) {
      // assume we're not in a browser env, just abort
      return;
    }
  }

  return function insert(_ref2) {
    var _ref2$theme = _ref2.theme,
        theme = _ref2$theme === void 0 ? {} : _ref2$theme,
        styles = _ref2.styles;
    var t = (0, _objectSpread2.default)({}, defaultTheme, pickValues(theme));
    var key = JSON.stringify((0, _objectSpread2.default)({}, t, {
      styles: styles
    }));

    if (key === insertedKey) {
      return;
    }

    if (!node) {
      injectStyle(styles || getStyles(t));
    }

    insertedKey = key;
  };
}