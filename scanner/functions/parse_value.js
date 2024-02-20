function parse_value(value) {
		try {
			// undefined (void 0), "true" and "false" are the most common ones, let's avoid calling JSON_parse unless necessary
			// this improves performance
			if (value === void 0) {
				return value;
			} else if (value === "true") {
				return true;
			} else if (value === "false") {
				return false;
			}
			return JSON_parse(value);
		} catch (e) {
			return value;
		}
	}