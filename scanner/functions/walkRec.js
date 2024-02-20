function walkRec(node, fn, arg) {
		if (1 === node.nodeType) {
			walk(node.firstChild, function (node) {
				walkRec(node, fn, arg);
			});
		}
		fn(node, arg);
	}