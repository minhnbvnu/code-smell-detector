function nextNode(node) {
		if (node.hasChildNodes()) {
			return node.firstChild;
		}
		return nextNodeDescendants(node);
	}