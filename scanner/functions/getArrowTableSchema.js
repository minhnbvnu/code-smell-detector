function getArrowTableSchema(table) {
  return table.schema.fields.map(getArrowFieldSchema);
}