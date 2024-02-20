function withThemeSuffix(type, theme) {
  var result = type;
  if (theme === 'filled') {
    result += '-fill';
  } else if (theme === 'outlined') {
    result += '-o';
  } else if (theme === 'twoTone') {
    result += '-twotone';
  } else {
    _util_warning(false, 'Icon', "This icon '".concat(type, "' has unknown theme '").concat(theme, "'"));
  }
  return result;
}