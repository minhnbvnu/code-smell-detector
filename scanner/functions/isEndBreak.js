function isEndBreak(element) {
		return (isNamedHtmlElement(element, 'br') && element.parentNode.lastChild === element);
	}