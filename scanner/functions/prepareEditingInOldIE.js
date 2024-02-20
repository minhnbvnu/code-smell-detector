function prepareEditingInOldIE(i, element) {
		var $element = $(element);
		$element.filter(nonVoidBlocksSelector).append('\u200b');
		$element.children(NOT_ALOHA_BLOCK_FILTER).each(prepareEditingInOldIE);
	}