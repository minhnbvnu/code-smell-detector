function processStyleValue(name, value) {
  var isNumeric = void 0;
  if (typeof value === 'string') {
    isNumeric = NUMERIC_STRING.test(value);
  } else {
    isNumeric = true;
    value = String(value);
  }
  if (!isNumeric || value === '0' || _CSSProperty.isUnitlessNumber[name] === true) {
    return value;
  } else {
    return value + 'px';
  }
}