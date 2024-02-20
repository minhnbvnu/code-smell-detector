function getValueOrDefault(settings, key, defaultVal, min) {
	try {
		var val = settings[key];
		if (isNaN(val) || val < min) {
			val = defaultVal;
		}
		return val;
	} catch(e) { return defaultVal; }
}