function parseProps(type) {
  if (!type) {
    return null;
  }

  var propDefinitionsMap = hasDocgen(type) ? propsFromDocgen(type) : propsFromPropTypes(type);
  return Object.values(propDefinitionsMap);
}