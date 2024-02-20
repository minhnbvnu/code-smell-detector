function removeShallow(node) {
		var parent = node.parentNode;
		moveNextAll(parent, node.firstChild, node);
		parent.removeChild(node);
	}