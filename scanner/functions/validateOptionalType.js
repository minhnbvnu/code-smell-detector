function validateOptionalType(typeName) {
  return {
    validate: typeIs(typeName),
    optional: true
  };
}