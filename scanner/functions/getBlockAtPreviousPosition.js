function getBlockAtPreviousPosition(node, offset) {
		var i;

		if (node.nodeType === $_.Node.TEXT_NODE && offset > 0) {
			for (i = offset - 1; i >= 0; i--) {
				if ((node.data.charAt(i) !== '\t' && node.data.charAt(i) !== '\r' && node.data.charAt(i) !== '\n') || node.data.charCodeAt(i) === 160) { // &nbsp;
					// this is a character that has to be deleted first
					return false;
				}
			}
		}

		// try the previous sibling
		if (node.previousSibling && node.previousSibling.className && node.previousSibling.className.indexOf("aloha-table-wrapper") >= 0) {
			return node.previousSibling;
		}

		// try the parent's previous sibling
		if (node.parentNode && node.parentNode.previousSibling && node.parentNode.previousSibling.className && node.parentNode.previousSibling.className.indexOf("aloha-table-wrapper") >= 0) {
			return node.parentNode.previousSibling;
		}

		// the parent's previous sibling might be a whitespace node
		if (node.parentNode && node.parentNode.previousSibling && isWhitespaceNode(node.parentNode.previousSibling) && node.parentNode.previousSibling.previousSibling && node.parentNode.previousSibling.previousSibling.className && node.parentNode.previousSibling.previousSibling.className.indexOf('aloha-table-wrapper') >= 0) {
			return node.parentNode.previousSibling.previousSibling;
		}

		// Note: the search above works for tables, since they cannot be
		// nested deeply in paragraphs and other formatting tags. If this code
		// is extended to work also for other blocks, the search probably needs to be adapted

		return false;
	}