function isQueryResultSetSchema(schemas) {
  return (
    Array.isArray(schemas) &&
    schemas.every(isColumnSchema)
  );
}