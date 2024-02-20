function coerceRow(object, types, schema) {
  const coerced = {};
  for (const col of schema) {
    const type = types.get(col.name);
    const value = object[col.name];
    coerced[col.name] = type === "raw" ? value : coerceToType(value, type);
  }
  return coerced;
}