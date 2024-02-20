function findWaiLangMarkup(range) {
		return Aloha.activeEditable
		     ? range.findMarkup(filterForWaiLangMarkup, Aloha.activeEditable.obj)
		     : null;
	}