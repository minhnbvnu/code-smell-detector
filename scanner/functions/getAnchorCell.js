function getAnchorCell(cells) {
		if (0 === cells.length) {
			return null;
		}

		var i;
		var editable;
		var range = CopyPaste.getRange();

		if (range) {
			editable = $(
				range.commonAncestorContainer
			).closest('.aloha-table-cell-editable')[0];
		}

		if (editable) {
			for (i = 0; i < cells.length; i++) {
				if ($(cells[i]).find(editable).length) {
					return cells[i];
				}
			}
		}

		return cells[0];
	}