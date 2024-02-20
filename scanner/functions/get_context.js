function get_context(parser, attributes, start) {
    const context = attributes.find((attribute) => attribute.name === "context");
    if (!context)
      return "default";
    if (context.value.length !== 1 || context.value[0].type !== "Text") {
      parser.error(parser_errors.invalid_script_context_attribute, start);
    }
    const value = context.value[0].data;
    if (value !== "module") {
      parser.error(parser_errors.invalid_script_context_value, context.start);
    }
    return value;
  }