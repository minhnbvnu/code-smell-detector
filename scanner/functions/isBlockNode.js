function isBlockNode(node) {
		return node && ((node.nodeType == $_.Node.ELEMENT_NODE && !nonBlockDisplayValuesMap[$_.getComputedStyle(node).display]) || node.nodeType == $_.Node.DOCUMENT_NODE || node.nodeType == $_.Node.DOCUMENT_FRAGMENT_NODE);
	}