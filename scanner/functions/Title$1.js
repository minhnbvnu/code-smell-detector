function Title$1(node2, renderer, options) {
    renderer.push();
    renderer.add_string("<title>");
    renderer.render(node2.children, options);
    renderer.add_string("</title>");
    const result = renderer.pop();
    renderer.add_expression(x`$$result.title = ${result}, ""`);
  }