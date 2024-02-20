function removePreservingDescendants(node, range) {
		if (node.hasChildNodes()) {
			splitParent([].slice.call(toArray(node.childNodes)), range);
		} else {
			node.parentNode.removeChild(node);
		}
	}