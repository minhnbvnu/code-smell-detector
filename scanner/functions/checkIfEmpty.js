function checkIfEmpty(schema, schemaProperty, value) {
  const type = schemaProperty.type;
  // ignoreZero
  let ignoreZero = schema.ignoreZero;
  if (ignoreZero === undefined) {
    ignoreZero = type !== 'number' && type !== 'integer';
  }
  if (schema.ignoreZero && value === 0) return false;
  return !value;
}