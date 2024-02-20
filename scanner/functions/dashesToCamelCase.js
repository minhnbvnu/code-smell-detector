function dashesToCamelCase(s) {
		return s.replace(/[\-]([a-z])/gi, function (all, upper) {
			return upper.toUpperCase();
		});
	}