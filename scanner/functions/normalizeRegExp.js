function normalizeRegExp(regexp) {
		return function (content) {
			return regexp.test(content);
		};
	}