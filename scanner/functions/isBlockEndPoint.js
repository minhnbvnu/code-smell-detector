function isBlockEndPoint(node, offset) {
		return (!node.parentNode && offset == getNodeLength(node)) || (offset < node.childNodes.length && isVisible(node.childNodes[offset]) && isBlockNode(node.childNodes[offset]));
	}