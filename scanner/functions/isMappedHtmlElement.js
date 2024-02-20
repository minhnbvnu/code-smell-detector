function isMappedHtmlElement(node, map) {
		return node && node.nodeType == 1 && isHtmlNamespace(node.namespaceURI) && map[node.nodeName];
	}