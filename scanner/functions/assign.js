function assign(target, source) {
		for (var key in source) {
			// Note: `hasOwnProperty` is not needed here.
			target[key] = source[key];
		}
	}