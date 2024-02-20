function activateButton(buttonName) {
		element.find('span.fc-button-' + buttonName)
			.addClass(tm + '-state-active');
	}