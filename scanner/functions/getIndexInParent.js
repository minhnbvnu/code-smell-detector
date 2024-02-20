function getIndexInParent(node) {
		if (!node) {
			return -1;
		}

		var i,
		    childNodes = node.parentNode.childNodes,
			len = childNodes.length;
		for (i = 0; i < len; i++) {
			if (childNodes[i] === node) {
				return i;
			}
		}

		return -1;
	}