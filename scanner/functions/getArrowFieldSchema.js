function getArrowFieldSchema(field) {
  return {
    name: field.name,
    type: getArrowType(field.type),
    nullable: field.nullable,
    databaseType: String(field.type)
  };
}