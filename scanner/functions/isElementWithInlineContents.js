function isElementWithInlineContents(node) {
		return isMappedHtmlElement(node, namesOfElementsWithInlineContentsMap);
	}