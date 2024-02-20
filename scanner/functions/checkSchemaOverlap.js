function checkSchemaOverlap(schema) {
  Object.keys(schema).forEach((key) => {
    const val = schema[key];
    if (!val.type) throw new Error(`${key} key is missing "type"`);
    val.type.definitions.forEach((def) => {
      if (!(SimpleSchema.isSimpleSchema(def.type))) return;

      Object.keys(def.type._schema).forEach((subKey) => {
        const newKey = `${key}.${subKey}`;
        if (Object.prototype.hasOwnProperty.call(schema, newKey)) {
          throw new Error(`The type for "${key}" is set to a SimpleSchema instance that defines "${key}.${subKey}", but the parent SimpleSchema instance also tries to define "${key}.${subKey}"`);
        }
      });
    });
  });
}