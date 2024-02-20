function enableButton(buttonName) {
		element.find('span.fc-button-' + buttonName)
			.removeClass(tm + '-state-disabled');
	}