function Head$1(node2, renderer, options) {
    const head_options = Object.assign(Object.assign({}, options), { head_id: node2.id });
    renderer.push();
    renderer.render(node2.children, head_options);
    const result = renderer.pop();
    let expression = result;
    if (options.hydratable) {
      const start_comment = `HEAD_${node2.id}_START`;
      const end_comment = `HEAD_${node2.id}_END`;
      expression = x`'<!-- ${start_comment} -->' + ${expression} + '<!-- ${end_comment} -->'`;
    }
    renderer.add_expression(x`$$result.head += ${expression}, ""`);
  }