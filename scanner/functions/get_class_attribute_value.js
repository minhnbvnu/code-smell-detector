function get_class_attribute_value(attribute) {
    if (attribute.chunks.length === 2 && attribute.chunks[1].synthetic) {
      const value = attribute.chunks[0].node;
      return x`@escape(@null_to_empty(${value}), true) + "${attribute.chunks[1].data}"`;
    }
    return get_attribute_value(attribute);
  }