function parseProperty (value, propDefinition) {
  // Use default value if value is falsy.
  if (value === undefined || value === null || value === '') {
    value = propDefinition.default;
    if (Array.isArray(value)) { value = value.slice(); }
  }
  // Invoke property type parser.
  return propDefinition.parse(value, propDefinition.default);
}