function isIndentationElement(node) {
		// Handling of indentation elements while deleting is somehow broken (pressing backspace
		// in blockquotes wraps the blockquote into a div, ...)
		// therefore for now, we pretend that indentation elements do not exist at all.
		return false;
	}