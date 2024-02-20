function overlay_object(base, obj) {
		if (typeof base === "function" || is_array(base))
			return obj; // FIXME?
		if (typeof base === "object") {
			if (typeof obj !== "object")
				return obj;
			for (var key in obj) {
				if (key in base) {
					base[key] = overlay_object(base[key], obj[key]);
				} else {
					base[key] = obj[key];
				}
			}
			return base;
		}
		return obj;
	}