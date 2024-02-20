function isVisiblyEmpty(node) {
		if (!node) {
			return true;
		}
		// TODO: use isChildlessElement()
		if ('BR' === node.nodeName) {
			return false;
		}
		if (node.nodeType === Node.TEXT_NODE) {
			// TODO: would prefer to use
			// (Html.isWhitespaces(node) || Html.isZeroWidthCharacters(node))
			// but cannot because of circular dependency
			if (node.data.search(/\S/) === -1) {
				return true;
			}
			// Fix for IE with zero-width characters
			if (1 === node.data.length && node.data.charCodeAt(0) >= 0x2000) {
				return true;
			}
			return false;
		}
		var numChildren = nodeLength(node);
		if (0 === numChildren) {
			return true;
		}
		var children = node.childNodes;
		var i;
		for (i = 0; i < numChildren; i++) {
			if (!isVisiblyEmpty(children[i])) {
				return false;
			}
		}
		return true;
	}