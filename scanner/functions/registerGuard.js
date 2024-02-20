function registerGuard(event, guard) {
		if (!registeredGuards[event]) {
			registeredGuards[event] = [];
		}
		registeredGuards[event].push(guard);
		return registeredGuards[event];
	}