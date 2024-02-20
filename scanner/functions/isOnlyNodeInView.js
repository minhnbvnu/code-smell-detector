function isOnlyNodeInView (node) {

	// Shouldn't happen as the Alloy tag should always exist, but lets handle it
	if (!node.parentNode) {
		return false;
	}

	// If the parent isn't the Alloy tag, then it isn't the only node in the view
	if (node.parentNode.nodeName !== 'Alloy') {
		return false;
	}

	// If there are sibling nodes, then it isn't the only node in the view
	const siblingNodes = U.XML.getElementsFromNodes(node.parentNode.childNodes).filter(n => n !== node);
	if (siblingNodes.length !== 0) {
		return false;
	}

	return true;
}