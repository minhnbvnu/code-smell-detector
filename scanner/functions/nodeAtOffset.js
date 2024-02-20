function nodeAtOffset(node, offset) {
		if (1 === node.nodeType && offset < numChildren(node)) {
			node = node.childNodes[offset];
		} else if (3 === node.nodeType && offset === node.length) {
			node = node.nextSibling || node.parentNode;
		}
		return node;
	}