function handleSchemaRequired(schema, checked) {
  // console.log(schema)
  if (schema.type === 'object') {
    let requiredtitle = getFieldstitle(schema.properties);

    // schema.required = checked ? [].concat(requiredtitle) : [];
    if (checked) {
      schema.required = [].concat(requiredtitle);
    } else {
      delete schema.required;
    }

    handleObject(schema.properties, checked);
  } else if (schema.type === 'array') {
    handleSchemaRequired(schema.items, checked);
  } else {
    return schema;
  }
}