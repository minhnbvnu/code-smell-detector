function isNonListSingleLineContainer(node) {
		return isHtmlElementInArray(node, ["address", "div", "h1", "h2", "h3", "h4", "h5", "h6", "listing", "p", "pre", "xmp"]);
	}