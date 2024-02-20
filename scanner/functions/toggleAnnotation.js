function toggleAnnotation() {
		if (Aloha.activeEditable) {
			var range = Selection.getRangeObject();
			if (findWaiLangMarkup(range)) {
				removeMarkup(range);
			} else {
				addMarkup(range);
				focusOn(FIELD);
			}
		}
	}