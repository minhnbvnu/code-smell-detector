function originatesFromDialog($event) {
		return $($event.target).closest('.aloha-dialog').length > 0;
	}