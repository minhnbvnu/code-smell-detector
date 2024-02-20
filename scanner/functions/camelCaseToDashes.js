function camelCaseToDashes(s) {
		return s.replace(/[A-Z]/g, function (match) {
			return '-' + match.toLowerCase();
		});
	}