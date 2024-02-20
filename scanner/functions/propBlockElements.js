function propBlockElements(i, element) {
		var $element = $(element);
		if ($.browser.msie) {
			$element.filter(nonVoidBlocksSelector).filter(':empty').append('<br/>');
			$element.children(NOT_ALOHA_BLOCK_FILTER).each(propBlockElements);
		}
	}