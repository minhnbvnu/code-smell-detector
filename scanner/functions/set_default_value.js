function set_default_value(key, value) {
		if (!(key in user_defined_settings)) {
			settings[key] = value;
		}
	}