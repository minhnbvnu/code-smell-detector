function backward(node) {
		var prev = node.previousSibling;
		while (prev && prev.lastChild) {
			prev = prev.lastChild;
		}
		return prev || node.parentNode;
	}