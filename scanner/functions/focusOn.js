function focusOn(field) {
		if (field) {
			field.foreground();
			field.focus();
		}
		FIELD.show();
		removeButton.show();
	}