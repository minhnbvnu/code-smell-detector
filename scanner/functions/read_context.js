function read_context(parser) {
    const start = parser.index;
    let i = parser.index;
    const code = full_char_code_at(parser.template, i);
    if (isIdentifierStart(code, true)) {
      return {
        type: "Identifier",
        name: parser.read_identifier(),
        start,
        end: parser.index
      };
    }
    if (!is_bracket_open(code)) {
      parser.error(parser_errors.unexpected_token_destructure);
    }
    const bracket_stack = [code];
    i += code <= 65535 ? 1 : 2;
    while (i < parser.template.length) {
      const code2 = full_char_code_at(parser.template, i);
      if (is_bracket_open(code2)) {
        bracket_stack.push(code2);
      } else if (is_bracket_close(code2)) {
        if (!is_bracket_pair(bracket_stack[bracket_stack.length - 1], code2)) {
          parser.error(parser_errors.unexpected_token(String.fromCharCode(get_bracket_close(bracket_stack[bracket_stack.length - 1]))));
        }
        bracket_stack.pop();
        if (bracket_stack.length === 0) {
          i += code2 <= 65535 ? 1 : 2;
          break;
        }
      }
      i += code2 <= 65535 ? 1 : 2;
    }
    parser.index = i;
    const pattern_string = parser.template.slice(start, i);
    try {
      let space_with_newline = parser.template.slice(0, start).replace(regex_not_newline_characters, " ");
      const first_space = space_with_newline.indexOf(" ");
      space_with_newline = space_with_newline.slice(0, first_space) + space_with_newline.slice(first_space + 1);
      return parse_expression_at(`${space_with_newline}(${pattern_string} = 1)`, start - 1).left;
    } catch (error2) {
      parser.acorn_error(error2);
    }
  }