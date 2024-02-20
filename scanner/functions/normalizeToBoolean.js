function normalizeToBoolean(value) {
		if (!value) {
			return false;
		}
		if (typeof value === 'string') {
			return '0' !== value && 'false' !== value.toLowerCase();
		}
		return true;
	}