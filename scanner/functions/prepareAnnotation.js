function prepareAnnotation() {
		var range = Selection.getRangeObject();

		// Because we don't want to add markup to an area that already contains
		// wai-lang markup
		if (!findWaiLangMarkup(range)) {
			addMarkup(range);
		}

		focusOn(FIELD);
	}