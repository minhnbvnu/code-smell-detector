function textLevelButtonClickHandler(formatPlugin, button) {
		if (formatInsideTableWorkaround(button)) {
			return false;
		}
		formatPlugin.addMarkup( button );
		return false;
	}