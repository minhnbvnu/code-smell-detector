function getNameIfPropertyIsLiteral(property) {
  return property.type === 'Literal' &&
    mutatingMethods.indexOf(property.value) !== -1 &&
    property.value;
}