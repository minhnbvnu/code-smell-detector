function changeMarkup(button) {
		Selection.changeMarkupOnSelection(jQuery('<' + button + '>'));
		if (Aloha.settings.plugins.format && Aloha.settings.plugins.format.checkHeadingHierarchy === true) {
			checkHeadingHierarchy(this.formatOptions);
		}
	}