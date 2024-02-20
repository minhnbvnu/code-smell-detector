function untilNode(node) {
		return node.nodeName.toLowerCase() === 'br' || Html.isBlock(node) || DomLegacy.isEditingHost(node);
	}