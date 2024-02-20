function isBlockStartPoint(node, offset) {
		return (!node.parentNode && offset == 0) || (0 <= offset - 1 && offset - 1 < node.childNodes.length && isVisible(node.childNodes[offset - 1]) && (isBlockNode(node.childNodes[offset - 1]) || isNamedHtmlElement(node.childNodes[offset - 1], "br")));
	}