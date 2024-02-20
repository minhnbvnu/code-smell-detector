function isEditingHostIgnoreEditableTableCells(node) {
		return DomLegacy.isEditingHost(node)
			&& (node.className.match("aloha-table-cell-editable") == null);
	}