function getBlockElement(element) {
		while (element && !Html.isBlock(element)) {
			element = element.parentNode;
		}
		return element;
	}