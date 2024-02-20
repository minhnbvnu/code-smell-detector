function getCellsInSelection(tableElement) {
		return Arrays.coerce(jQuery(tableElement).find('.aloha-cell-selected'));
	}