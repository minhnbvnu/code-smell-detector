function registerArguments(guard, args) {
		if (!registeredArguments[guard.alohaUid]) {
			registeredArguments[guard.alohaUid] = [];
		}
		registeredArguments[guard.alohaUid].push(args);
		return registeredArguments[guard.alohaUid];
	}