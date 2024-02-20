function isListInSelection(needle) {
		var selectionTree = Aloha.Selection.getSelectionTree();
		return checkSelectionTreeEntryForElement(selectionTree, needle);
	}