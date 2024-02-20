function _fuzzy_compare_rollover(a, b, lim) {
		if (a === b)
			return true;
		if (a - 1 === b || a + 1 === b)
			return true;
		for (var i = 0; i < lim.length; i++) {
			if (a === lim[i]) {
				if (b === 1)
					return true;
			} else if (b === lim[i]) {
				if (a === 1)
					return true;
			}
		}
		return false;
	}