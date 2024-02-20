function blockLevelButtonClickHandler(formatPlugin, button) {
		if (formatInsideTableWorkaround(button)) {
			return false;
		}

		formatPlugin.changeMarkup( button );

		// setting the focus is needed for mozilla to have a working rangeObject.select()
		if (Aloha.activeEditable && jQuery.browser.mozilla && document.activeElement !== Aloha.activeEditable.obj[0]) {
			Aloha.activeEditable.obj.focus();
		}

		// triggered for numerated-headers plugin
		if (Aloha.activeEditable) {
			Aloha.trigger( 'aloha-format-block' );
		}
	}