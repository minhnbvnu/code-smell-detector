function getNameIfPropertyIsIdentifier(property) {
  return property.type === 'Identifier' &&
    mutatingMethods.indexOf(property.name) !== -1 &&
    property.name;
}