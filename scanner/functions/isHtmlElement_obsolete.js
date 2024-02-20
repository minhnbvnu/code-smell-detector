function isHtmlElement_obsolete(node, tags) {
		if (typeof tags == "string") {
			tags = [tags];
		}
		if (typeof tags == "object") {
			tags = $_(tags).map(function (tag) {
				return tag.toUpperCase();
			});
		}
		return node && node.nodeType == 1 && isHtmlNamespace(node.namespaceURI) && (typeof tags == "undefined" || $_(tags).indexOf(node.tagName) != -1);
	}