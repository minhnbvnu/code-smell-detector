function read_attribute(parser, unique_names) {
    const start = parser.index;
    function check_unique(name3) {
      if (unique_names.has(name3)) {
        parser.error(parser_errors.duplicate_attribute, start);
      }
      unique_names.add(name3);
    }
    if (parser.eat("{")) {
      parser.allow_whitespace();
      if (parser.eat("...")) {
        const expression = read_expression(parser);
        parser.allow_whitespace();
        parser.eat("}", true);
        return {
          start,
          end: parser.index,
          type: "Spread",
          expression
        };
      } else {
        const value_start = parser.index;
        const name3 = parser.read_identifier();
        parser.allow_whitespace();
        parser.eat("}", true);
        if (name3 === null) {
          parser.error(parser_errors.empty_attribute_shorthand, start);
        }
        check_unique(name3);
        return {
          start,
          end: parser.index,
          type: "Attribute",
          name: name3,
          value: [{
            start: value_start,
            end: value_start + name3.length,
            type: "AttributeShorthand",
            expression: {
              start: value_start,
              end: value_start + name3.length,
              type: "Identifier",
              name: name3
            }
          }]
        };
      }
    }
    const name2 = parser.read_until(regex_token_ending_character);
    if (!name2)
      return null;
    let end = parser.index;
    parser.allow_whitespace();
    const colon_index = name2.indexOf(":");
    const type = colon_index !== -1 && get_directive_type(name2.slice(0, colon_index));
    let value = true;
    if (parser.eat("=")) {
      parser.allow_whitespace();
      value = read_attribute_value(parser);
      end = parser.index;
    } else if (parser.match_regex(regex_starts_with_quote_characters)) {
      parser.error(parser_errors.unexpected_token("="), parser.index);
    }
    if (type) {
      const [directive_name, ...modifiers] = name2.slice(colon_index + 1).split("|");
      if (directive_name === "") {
        parser.error(parser_errors.empty_directive_name(type), start + colon_index + 1);
      }
      if (type === "Binding" && directive_name !== "this") {
        check_unique(directive_name);
      } else if (type !== "EventHandler" && type !== "Action") {
        check_unique(name2);
      }
      if (type === "Ref") {
        parser.error(parser_errors.invalid_ref_directive(directive_name), start);
      }
      if (type === "StyleDirective") {
        return {
          start,
          end,
          type,
          name: directive_name,
          modifiers,
          value
        };
      }
      const first_value = value[0];
      let expression = null;
      if (first_value) {
        const attribute_contains_text = value.length > 1 || first_value.type === "Text";
        if (attribute_contains_text) {
          parser.error(parser_errors.invalid_directive_value, first_value.start);
        } else {
          expression = first_value.expression;
        }
      }
      const directive = {
        start,
        end,
        type,
        name: directive_name,
        modifiers,
        expression
      };
      if (type === "Transition") {
        const direction = name2.slice(0, colon_index);
        directive.intro = direction === "in" || direction === "transition";
        directive.outro = direction === "out" || direction === "transition";
      }
      if (!directive.expression && (type === "Binding" || type === "Class")) {
        directive.expression = {
          start: directive.start + colon_index + 1,
          end: directive.end,
          type: "Identifier",
          name: directive.name
        };
      }
      return directive;
    }
    check_unique(name2);
    return {
      start,
      end,
      type: "Attribute",
      name: name2,
      value
    };
  }