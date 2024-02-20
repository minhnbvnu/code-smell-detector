function getSchema(source) {
  const {columns} = source;
  let {schema} = source;
  if (!isQueryResultSetSchema(schema)) {
    schema = inferSchema(source, isQueryResultSetColumns(columns) ? columns : undefined);
    return {schema, inferred: true};
  }
  return {schema, inferred: false};
}