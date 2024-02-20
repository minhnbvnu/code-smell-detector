function selectAllOf(element) {
		setSelectionAt({
			startContainer: element,
			endContainer: element,
			startOffset: 0,
			endOffset: element.childNodes ? element.childNodes.length
		                                  : element.length
		});
		$(element).focus();
	}