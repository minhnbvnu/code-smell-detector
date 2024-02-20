function Tag$2(node2, renderer, _options) {
    const snippet = node2.expression.node;
    renderer.add_expression(node2.parent && node2.parent.type === "Element" && node2.parent.name === "style" ? snippet : x`@escape(${snippet})`);
  }