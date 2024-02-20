function skipNodeForward(node) {
		if (node.lastChild) {
			return skipNodeForward(node.lastChild);
		} else {
			return Dom.forward(node);
		}
	}