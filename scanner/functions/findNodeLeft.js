function findNodeLeft(node, condition) {
		while (node && !condition(node)) {
			node = node.nextSibling;
		}
		return node;
	}