function eventPreventDefault(event) {
		// check if we can call preventDefault on the event
		if (event && event.preventDefault) {
			event.preventDefault();
		} else {
			// if the event or preventDefault() does not exist we return false
			return false;
		}
	}