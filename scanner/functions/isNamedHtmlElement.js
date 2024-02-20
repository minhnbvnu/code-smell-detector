function isNamedHtmlElement(node, name) {
		return node && node.nodeType == 1 && isHtmlNamespace(node.namespaceURI)
		// This function is passed in a mix of upper and lower case names
			&& name.toUpperCase() === node.nodeName;
	}