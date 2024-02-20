function _filterResult({ ajv, validate, data, filterOptions }) {
  if (filterOptions === true) {
    filterOptions = { type: true, ebReadOnly: true };
  }
  _filterSchema({ ajv, schema: validate.schema, data, filterOptions });
}