function read_style(parser, start, attributes) {
    const content_start = parser.index;
    const styles = parser.read_until(regex_closing_style_tag, parser_errors.unclosed_style);
    if (parser.index >= parser.template.length) {
      parser.error(parser_errors.unclosed_style);
    }
    const content_end = parser.index;
    if (parser.css_mode === "none") {
      parser.read(regex_starts_with_closing_style_tag);
      return null;
    }
    let ast;
    try {
      ast = parse$a(styles, {
        positions: true,
        offset: content_start,
        onParseError(error2) {
          throw error2;
        }
      });
    } catch (err) {
      if (err.name === "SyntaxError") {
        parser.error(parser_errors.css_syntax_error(err.message), err.offset);
      } else {
        throw err;
      }
    }
    ast = JSON.parse(JSON.stringify(ast));
    walk(ast, {
      enter: (node2) => {
        if (node2.type === "Selector") {
          for (let i = 0; i < node2.children.length; i += 1) {
            const a = node2.children[i];
            const b2 = node2.children[i + 1];
            if (is_ref_selector(a, b2)) {
              parser.error(parser_errors.invalid_ref_selector, a.loc.start.offset);
            }
          }
        }
        if (node2.type === "Declaration" && node2.value.type === "Value" && node2.value.children.length === 0) {
          parser.error(parser_errors.invalid_declaration, node2.start);
        }
        if (node2.type === "PseudoClassSelector" && node2.name === "global" && node2.children === null) {
          parser.error(parser_errors.empty_global_selector, node2.loc.start.offset);
        }
        if (node2.loc) {
          node2.start = node2.loc.start.offset;
          node2.end = node2.loc.end.offset;
          delete node2.loc;
        }
      }
    });
    parser.read(regex_starts_with_closing_style_tag);
    const end = parser.index;
    return {
      type: "Style",
      start,
      end,
      attributes,
      children: ast.children,
      content: {
        start: content_start,
        end: content_end,
        styles
      }
    };
  }