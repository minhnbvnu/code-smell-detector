function findBackward(node, match, until) {
		while (node && !until(node)) {
			if (match(node)) {
				return node;
			}
			node = backward(node);
		}
		return null;
	}