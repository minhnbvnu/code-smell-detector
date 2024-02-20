function rangeStartsAtProppedParagraph(range) {
		var start = range.startContainer;
		if (1 === start.nodeType) {
			return ('p' === start.nodeName.toLowerCase() &&
					ContentHandlerUtils.isProppedParagraph(start.outerHTML));
		}
		return (3 === start.nodeType &&
				'p' === start.parentNode.nodeName.toLowerCase() &&
					1 === start.parentNode.childNodes.length &&
						PROPPING_SPACE.test(window.escape(start.data)));
	}