function parseConfiguration(config) {
		var parsed = {};
		if (typeof config.formatlessPasteOption !== 'undefined') {
			parsed.formatlessPasteOption =
					normalizeToBoolean(config.formatlessPasteOption);
		}
		if (typeof config.strippedElements !== 'undefined') {
			parsed.strippedElements = config.strippedElements;
		}
		if (typeof config.button !== 'undefined') {
			parsed.button = normalizeToBoolean(config.button);
		}
		return parsed;
	}