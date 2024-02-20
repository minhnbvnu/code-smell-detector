function isIgnorableWhitespace(node) {
		return 3 === node.nodeType && !node.length;
	}