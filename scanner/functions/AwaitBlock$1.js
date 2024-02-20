function AwaitBlock$1(node2, renderer, options) {
    renderer.push();
    renderer.render(node2.pending.children, options);
    const pending = renderer.pop();
    renderer.push();
    renderer.render(node2.then.children, options);
    const then = renderer.pop();
    renderer.add_expression(x`
		function(__value) {
			if (@is_promise(__value)) {
				__value.then(null, @noop);
				return ${pending};
			}
			return (function(${node2.then_node ? node2.then_node : ""}) { ${get_const_tags$1(node2.then.const_tags)}; return ${then}; }(__value));
		}(${node2.expression.node})
	`);
  }