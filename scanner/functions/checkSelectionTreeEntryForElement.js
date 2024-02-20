function checkSelectionTreeEntryForElement(treeElementArray, needle) {
		var found = false;
		jQuery.each(treeElementArray, function (index, element) {
			if ((element.domobj === needle && element.selection !== "none") || checkSelectionTreeEntryForElement(element.children, needle)) {
				found = true;
			}
		});
		return found;
	}