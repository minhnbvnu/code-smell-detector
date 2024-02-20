function getRootParent(node) {
		var parent = null;

		if (node) {
			do {
				parent = node;
			} while (null != (node = node.parentNode));
		}

		return parent;
	}