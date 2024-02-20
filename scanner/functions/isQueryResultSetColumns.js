function isQueryResultSetColumns(columns) {
  return (Array.isArray(columns) && columns.every((name) => typeof name === "string"));
}