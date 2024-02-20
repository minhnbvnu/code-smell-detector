function isVisibleTextNode(node) {
		return 0 < node.data.replace(/\s+/g, '').length;
	}