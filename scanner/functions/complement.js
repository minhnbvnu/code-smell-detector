function complement(fn) {
		return function () {
			return !fn.apply(this, arguments);
		};
	}