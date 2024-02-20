function isSingleLineContainer(node) {
		return isNonListSingleLineContainer(node) || isHtmlElementInArray(node, ["li", "dt", "dd"]);
	}