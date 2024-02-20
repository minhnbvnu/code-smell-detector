function clearValue(value) {
		if (!value) {
			return value;
		}

		return value.replace(/[^0-9]/g, '');
	}