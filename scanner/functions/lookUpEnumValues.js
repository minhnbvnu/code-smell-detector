function lookUpEnumValues(protoType, fieldType, enumTypes) {
  // First tree class scope
  let values = enumTypes[`${protoType.fullName}.${fieldType}`];

  if (values === undefined) {
    // Then package scope
    values = enumTypes[`${protoType.parent.fullName}.${fieldType}`];
  }

  return values;
}