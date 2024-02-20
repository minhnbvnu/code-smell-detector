function HtmlTag(node2, renderer, options) {
    if (options.hydratable)
      renderer.add_string("<!-- HTML_TAG_START -->");
    renderer.add_expression(node2.expression.node);
    if (options.hydratable)
      renderer.add_string("<!-- HTML_TAG_END -->");
  }