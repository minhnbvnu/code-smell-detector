function DebugTag$1(node2, renderer, options) {
    if (!options.dev)
      return;
    const filename = options.filename || null;
    const { line, column } = options.locate(node2.start + 1);
    const obj = x`{
		${node2.expressions.map((e) => p`${e.node.name}`)}
	}`;
    renderer.add_expression(x`@debug(${filename ? x`"${filename}"` : x`null`}, ${line - 1}, ${column}, ${obj})`);
  }