function get_attribute_value(attribute) {
    if (attribute.chunks.length === 0)
      return x`""`;
    const is_textarea_value = attribute.parent.name.toLowerCase() === "textarea" && attribute.name.toLowerCase() === "value";
    return attribute.chunks.map((chunk) => {
      return chunk.type === "Text" ? string_literal(chunk.data.replace(regex_double_quotes, "&quot;")) : x`@escape(${chunk.node}, ${is_textarea_value ? "false" : "true"})`;
    }).reduce((lhs, rhs) => x`${lhs} + ${rhs}`);
  }