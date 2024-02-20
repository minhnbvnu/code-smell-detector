function originatesFromUiWidget($event) {
		return $($event.target).closest('.ui-widget').length > 0;
	}