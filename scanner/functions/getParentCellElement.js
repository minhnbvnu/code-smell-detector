function getParentCellElement(node) {
		while (node && !isEditingHostIgnoreEditableTableCells(node)) {
			if (node.nodeName === 'TD' || node.nodeName === 'TH') {
				return node;
			}
			node = node.parentNode;
		}

		return null;
	}