function convertProperty(property) {
		// Special-case for now
		var map = {
			"fontFamily": "font-family",
			"fontSize": "font-size",
			"fontStyle": "font-style",
			"fontWeight": "font-weight",
			"textDecoration": "text-decoration"
		};
		if (typeof map[property] != "undefined") {
			return map[property];
		}

		return property;
	}