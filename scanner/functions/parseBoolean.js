function parseBoolean(value) {
		if (value === true || value === 1) {
			return true;
		} else if (typeof value === 'string' || value instanceof String) {
			value = value.toLowerCase();
			return value === 'true' || value === '1';
		}
		return false;
	}