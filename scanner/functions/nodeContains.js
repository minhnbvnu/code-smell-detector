function nodeContains(node1, node2) {
		return isOldIE ? (shims.compareDocumentPosition(node1, node2) & 16) : 0 < jQuery(node1).find(node2).length;
	}