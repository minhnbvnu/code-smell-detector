function nextNodeDescendants(node) {
		while (node && !node.nextSibling) {
			node = node.parentNode;
		}
		if (!node) {
			return null;
		}
		return node.nextSibling;
	}