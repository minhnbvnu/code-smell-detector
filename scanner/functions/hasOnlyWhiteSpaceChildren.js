function hasOnlyWhiteSpaceChildren(elem) {
		var children = elem.childNodes;
		var i, len;
		for (i = 0, len = children.length; i < len; i++) {
			if (!isWSPorZWSPNode(children[i])) {
				return false;
			}
		}

		return true;
	}