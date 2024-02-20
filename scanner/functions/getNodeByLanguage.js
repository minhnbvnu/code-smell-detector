function getNodeByLanguage(nodes, lang) {
	var nodesLength = nodes.length;
	for (var i = 0; i < nodesLength; i++) {
		var node = nodes[i]
		var attr = (node.attributes.lang || node.attributes.hreflang)
		if (attr.nodeValue === lang) {
			return node
		}
	}
}