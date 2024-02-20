function removeEmptyElements(node, elements) {
		removeCSSClassEmptyElement(node);
		deleteElements(getEmptyElements(node, elements));
	}