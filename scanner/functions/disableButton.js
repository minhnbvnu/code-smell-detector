function disableButton(buttonName) {
		element.find('span.fc-button-' + buttonName)
			.addClass(tm + '-state-disabled');
	}