function isColumnSchema(schema) {
  return schema && typeof schema.name === "string" && typeof schema.type === "string";
}