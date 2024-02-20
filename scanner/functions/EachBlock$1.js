function EachBlock$1(node2, renderer, options) {
    const args = [node2.context_node];
    if (node2.index)
      args.push({ type: "Identifier", name: node2.index });
    renderer.push();
    renderer.render(node2.children, options);
    const result = renderer.pop();
    const consequent = x`@each(${node2.expression.node}, (${args}) => { ${get_const_tags$1(node2.const_tags)}; return ${result} })`;
    if (node2.else) {
      renderer.push();
      renderer.render(node2.else.children, options);
      let alternate = renderer.pop();
      if (node2.else.const_tags.length > 0)
        alternate = x`(() => { ${get_const_tags$1(node2.else.const_tags)}; return ${alternate} })()`;
      renderer.add_expression(x`${node2.expression.node}.length ? ${consequent} : ${alternate}`);
    } else {
      renderer.add_expression(consequent);
    }
  }