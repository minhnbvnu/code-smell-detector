function enforceSchema(source, schema) {
  const types = new Map(schema.map(({name, type}) => [name, type]));
  return Object.assign(source.map(d => coerceRow(d, types, schema)), {schema});
}