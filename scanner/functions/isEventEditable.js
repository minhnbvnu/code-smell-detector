function isEventEditable(event) {
		return firstDefined(event.editable, (event.source || {}).editable, opt('editable'));
	}