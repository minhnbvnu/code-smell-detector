function IfBlock$1(node2, renderer, options) {
    const condition = node2.expression.node;
    renderer.push();
    renderer.render(node2.children, options);
    let consequent = renderer.pop();
    if (node2.const_tags.length > 0)
      consequent = x`(() => { ${get_const_tags$1(node2.const_tags)}; return ${consequent} })()`;
    renderer.push();
    if (node2.else)
      renderer.render(node2.else.children, options);
    let alternate = renderer.pop();
    if (node2.else && node2.else.const_tags.length > 0)
      alternate = x`(() => { ${get_const_tags$1(node2.else.const_tags)}; return ${alternate} })()`;
    renderer.add_expression(x`${condition} ? ${consequent} : ${alternate}`);
  }