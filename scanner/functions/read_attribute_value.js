function read_attribute_value(parser) {
    const quote_mark = parser.eat("'") ? "'" : parser.eat('"') ? '"' : null;
    if (quote_mark && parser.eat(quote_mark)) {
      return [{
        start: parser.index - 1,
        end: parser.index - 1,
        type: "Text",
        raw: "",
        data: ""
      }];
    }
    let value;
    try {
      value = read_sequence(parser, () => {
        if (quote_mark)
          return parser.match(quote_mark);
        return !!parser.match_regex(regex_starts_with_invalid_attr_value);
      }, "in attribute value");
    } catch (error2) {
      if (error2.code === "parse-error") {
        if (parser.template.slice(error2.pos - 1, error2.pos + 1) === "/>") {
          parser.index = error2.pos;
          parser.error(parser_errors.unclosed_attribute_value(quote_mark || "}"));
        }
      }
      throw error2;
    }
    if (value.length === 0 && !quote_mark) {
      parser.error(parser_errors.missing_attribute_value);
    }
    if (quote_mark)
      parser.index += 1;
    return value;
  }