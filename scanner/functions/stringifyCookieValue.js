function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}