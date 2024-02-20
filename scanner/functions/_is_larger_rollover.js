function _is_larger_rollover(a, b, end) {
		if (a === 1 && array_indexof(end, b) >= 0)
			return true;
		if (b === 1 && array_indexof(end, a) >= 0)
			return true;
		return false;
	}