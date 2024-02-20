function isAnyHtmlElement(node) {
		return node && node.nodeType == 1 && isHtmlNamespace(node.namespaceURI);
	}