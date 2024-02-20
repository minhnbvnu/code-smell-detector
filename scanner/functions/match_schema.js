function match_schema(schema, tag_name, attribute_map) {
    if (schema.name !== tag_name)
      return false;
    if (!schema.attributes)
      return true;
    return schema.attributes.every((schema_attribute) => {
      const attribute = attribute_map.get(schema_attribute.name);
      if (!attribute)
        return false;
      if (schema_attribute.value && schema_attribute.value !== attribute.get_static_value()) {
        return false;
      }
      return true;
    });
  }