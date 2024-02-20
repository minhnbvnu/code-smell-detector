function inSameEditingHost(node1, node2) {
		return getEditingHostOf(node1) && getEditingHostOf(node1) == getEditingHostOf(node2);
	}