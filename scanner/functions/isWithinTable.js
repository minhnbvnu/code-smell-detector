function isWithinTable($element) {
		return 0 < $element.parents('.aloha-editable table').length;
	}