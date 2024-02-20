function rangeStartInBlock(range) {
		return jQuery(range.startContainer).closest('.aloha-editable,.aloha-block,.aloha-table-cell-editable,.aloha-table-cell_active')
		                   .first()
			               .hasClass('aloha-block');
	}