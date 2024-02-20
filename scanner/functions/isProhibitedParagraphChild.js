function isProhibitedParagraphChild(node) {
		return isMappedHtmlElement(node, prohibitedParagraphChildNamesMap);
	}