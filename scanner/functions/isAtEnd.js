function isAtEnd(node, offset) {
		return (1 === node.nodeType
				&& offset >= numChildren(node))
			|| (3 === node.nodeType
				&& offset === node.length
				&& !node.nextSibling);
	}