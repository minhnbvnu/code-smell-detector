function validateXVIZJSON(t, validator, schemaName, object, description) {
  t.doesNotThrow(
    () => validator.validate(schemaName, object),
    `Valid (schema: ${schemaName}): ${description}`
  );
}