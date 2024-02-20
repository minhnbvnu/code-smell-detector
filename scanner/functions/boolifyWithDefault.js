function boolifyWithDefault(val, defaultResult) {
  return val === '' || val === null || val === undefined ? defaultResult : boolify(val);
}