function addDefaultRules(mapRules) {
		var selector;
		for (selector in mapRules) {
			if (mapRules.hasOwnProperty(selector)) {
				if (Arrays.contains(mapRules[selector], 'ol') || Arrays.contains(mapRules[selector], 'ul')) {
					mapRules[selector] = Arrays.concat(mapRules[selector], LIST_WHITELIST_NODE_NAMES);
				}
				if (Arrays.contains(mapRules[selector], 'table')) {
					mapRules[selector] = Arrays.concat(mapRules[selector], TABLE_WHITELIST_NODE_NAMES);
				}
			}
		}
		return mapRules;
	}