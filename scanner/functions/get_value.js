function get_value(block, attribute) {
    if (attribute.is_true)
      return x`true`;
    if (attribute.chunks.length === 0)
      return x`""`;
    let value = attribute.chunks.map((chunk) => chunk.type === "Text" ? string_literal(chunk.data) : block ? chunk.manipulate(block) : chunk.node).reduce((lhs, rhs) => x`${lhs} + ${rhs}`);
    if (attribute.chunks.length > 1 && attribute.chunks[0].type !== "Text") {
      value = x`"" + ${value}`;
    }
    return value;
  }