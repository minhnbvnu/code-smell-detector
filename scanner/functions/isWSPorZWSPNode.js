function isWSPorZWSPNode(node) {
		return 3 === node.nodeType && isWSPorZWSPText(node.data);
	}