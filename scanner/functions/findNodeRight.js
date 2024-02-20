function findNodeRight(node, condition) {
		while (node && !condition(node)) {
			node = node.previousSibling;
		}
		return node;
	}