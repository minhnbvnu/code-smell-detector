function findForward(node, match, until) {
		while (node && !until(node)) {
			if (match(node)) {
				return node;
			}
			node = forward(node);
		}
		return null;
	}