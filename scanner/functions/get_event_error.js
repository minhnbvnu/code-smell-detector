function get_event_error(e) {
		// https://stackoverflow.com/a/46064096
		var error = e;
		if (e.path && e.path[0]) {
			error = e.path[0].error;
		}
		if (e.originalTarget) {
			error = e.originalTarget.error;
		}
		return error;
	}