function _filterSchema({ ajv, schema, data, filterOptions }) {
  _filterProperties({ ajv, properties: schema.properties, data, filterOptions });
}