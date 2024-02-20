function deactivateButton(buttonName) {
		element.find('span.fc-button-' + buttonName)
			.removeClass(tm + '-state-active');
	}