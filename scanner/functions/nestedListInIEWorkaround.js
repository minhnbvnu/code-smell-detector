function nestedListInIEWorkaround(range) {
		var nextSibling;
		if (Aloha.browser.msie && range.startContainer === range.endContainer && range.startOffset === range.endOffset && range.startContainer.nodeType == 3 && range.startOffset == range.startContainer.data.length && range.startContainer.nextSibling) {
			nextSibling = range.startContainer.nextSibling;
			if ('OL' === nextSibling.nodeName || 'UL' === nextSibling.nodeName) {
				if (range.startContainer.data[range.startContainer.data.length - 1] == ' ') {
					range.startOffset = range.endOffset = range.startOffset - 1;
				} else {
					range.startContainer.data = range.startContainer.data + ' ';
				}
			}
		}
	}