function get_attribute_expression(attribute) {
    if (attribute.chunks.length === 1 && attribute.chunks[0].type === "Expression") {
      return attribute.chunks[0].node;
    }
    return get_attribute_value(attribute);
  }