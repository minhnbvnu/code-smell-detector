function applyNotNull(value, fn) {
		return value == null ? null : fn(value);
	}