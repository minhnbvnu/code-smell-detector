function wrapDialogButtons(buttons) {
		// Buttons automatically close the dialog for convenience
		var title;
		for (title in buttons) {
			if (buttons.hasOwnProperty(title)) {
				buttons[title] = callbackAndDestroy(buttons[title]);
			}
		}
		return buttons;
	}