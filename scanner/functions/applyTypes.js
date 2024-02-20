function applyTypes(source, operations) {
  const input = source;
  let {schema, inferred} = getSchema(source);
  const types = new Map(schema.map(({name, type}) => [name, type]));
  if (operations.types) {
    for (const {name, type} of operations.types) {
      types.set(name, type);
      // update schema with user-selected type
      if (schema === input.schema) schema = schema.slice(); // copy on write
      const colIndex = schema.findIndex((col) => col.name === name);
      if (colIndex > -1) schema[colIndex] = {...schema[colIndex], type};
    }
    source = source.map(d => coerceRow(d, types, schema));
  } else if (inferred) {
    // Coerce data according to new schema, unless that happened due to
    // operations.types, above.
    source = source.map(d => coerceRow(d, types, schema));
  }
  return {source, schema};
}