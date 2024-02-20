function read_script(parser, start, attributes) {
    const script_start = parser.index;
    const data2 = parser.read_until(regex_closing_script_tag, parser_errors.unclosed_script);
    if (parser.index >= parser.template.length) {
      parser.error(parser_errors.unclosed_script);
    }
    const source = parser.template.slice(0, script_start).replace(regex_not_newline_characters, " ") + data2;
    parser.read(regex_starts_with_closing_script_tag);
    let ast;
    try {
      ast = parse$2(source);
    } catch (err) {
      parser.acorn_error(err);
    }
    ast.start = script_start;
    return {
      type: "Script",
      start,
      end: parser.index,
      context: get_context(parser, attributes, start),
      content: ast
    };
  }