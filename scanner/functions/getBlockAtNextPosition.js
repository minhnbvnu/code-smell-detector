function getBlockAtNextPosition(node, offset) {
		var i;

		// if we're inside a text node we first have to check
		// if there is nothing but tabs, newlines or the like
		// after our current cursor position
		if (node.nodeType === $_.Node.TEXT_NODE && offset < node.length) {
			for (i = offset; i < node.length; i++) {
				if ((node.data.charAt(i) !== '\t' && node.data.charAt(i) !== '\r' && node.data.charAt(i) !== '\n') || node.data.charCodeAt(i) === 160) { // &nbsp;
					// this is a character that has to be deleted first
					return false;
				}
			}
		}

		// try the most simple approach first: the next sibling
		// is a table
		if (node.nextSibling && node.nextSibling.className && node.nextSibling.className.indexOf("aloha-table-wrapper") >= 0) {
			return node.nextSibling;
		}

		// since we got only ignorable whitespace here determine if
		// our nodes parents next sibling is a table
		if (node.parentNode && node.parentNode.nextSibling && node.parentNode.nextSibling.className && node.parentNode.nextSibling.className.indexOf("aloha-table-wrapper") >= 0) {
			return node.parentNode.nextSibling;
		}

		// our parents nextsibling is a pure whitespace node such as
		// generated by sourcecode indentation so we'll check for
		// the next next sibling
		if (node.parentNode && node.parentNode.nextSibling && isWhitespaceNode(node.parentNode.nextSibling) && node.parentNode.nextSibling.nextSibling && node.parentNode.nextSibling.nextSibling.className && node.parentNode.nextSibling.nextSibling.className.indexOf("aloha-table-wrapper") >= 0) {
			return node.parentNode.nextSibling.nextSibling;
		}

		// Note: the search above works for tables, since they cannot be
		// nested deeply in paragraphs and other formatting tags. If this code
		// is extended to work also for other blocks, the search probably needs to be adapted
	}