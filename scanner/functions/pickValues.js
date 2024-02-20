function pickValues(theme) {
  var t = {
    bodyColor: theme.textColor,
    preBackgroundColor: theme.appBg,
    tableTrBackgroundColor: theme.barBg,
    tableOddTrBackgroundColor: theme.appBg
  };
  return Object.keys(t).filter(function (k) {
    return t[k];
  }).reduce(function (theme, k) {
    theme[k] = t[k];
    return theme;
  }, (0, _objectSpread2.default)({}, theme));
}