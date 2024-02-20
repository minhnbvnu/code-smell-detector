function get_prop_value(attribute) {
    if (attribute.is_true)
      return x`true`;
    if (attribute.chunks.length === 0)
      return x`''`;
    return attribute.chunks.map((chunk) => {
      if (chunk.type === "Text")
        return string_literal(chunk.data);
      return chunk.node;
    }).reduce((lhs, rhs) => x`${lhs} + ${rhs}`);
  }