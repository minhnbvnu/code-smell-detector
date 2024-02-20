function getFurthestAncestor(node) {
		var root = node;
		while (root.parentNode != null) {
			root = root.parentNode;
		}
		return root;
	}