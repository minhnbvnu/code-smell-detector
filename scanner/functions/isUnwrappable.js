function isUnwrappable(node) {
		return jQuery.inArray(node.nodeName, NOT_UNWRAPPABLE_NODES) === -1;
	}