function registerEvents(events) {
		var i;
		for (i = 0; i < events.length; i++) {
			Aloha.bind(events[i], validateActiveEditable);
		}
	}