function addCSSClassEmptyElements(node, elements) {
		var emptyElements = getEmptyElements(node, elements);

		jQuery.each(emptyElements, function(i, paragraph) {
			jQuery(paragraph).addClass(EMPTY_ELEMENT_CSS_CLASS);
		});
	}