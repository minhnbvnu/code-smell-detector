function untilNodeForward(node) {
		return untilNode(node) || (node.previousSibling && DomLegacy.isEditingHost(node.previousSibling)) || isAlohaBlock(node);
	}