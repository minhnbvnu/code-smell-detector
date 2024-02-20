function _filterProperties({ ajv, properties, data, filterOptions }) {
  if (!data) return;
  for (const key in properties) {
    const property = properties[key];
    if (data[key] === undefined) continue;
    // special for json
    if (property.ebType === 'json' && property.type === 'string' && data[key] === '') {
      data[key] = null;
    }
    if (filterOptions.type && !property.type) {
      delete data[key];
    } else if (filterOptions.ebReadOnly && property.ebReadOnly === true) {
      delete data[key];
    } else if (property.type === 'object' && property.properties) {
      _filterProperties({ ajv, properties: property.properties, data: data[key], filterOptions });
    } else if (property.type === 'object' && property.$ref) {
      const validate = ajv.getSchema(property.$ref);
      _filterSchema({ ajv, schema: validate.schema, data: data[key], filterOptions });
    }
  }
}