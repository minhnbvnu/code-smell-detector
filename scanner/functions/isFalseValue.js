function isFalseValue(val) {
  return val && (_.toLower(val) === 'false' || val === '0');
}