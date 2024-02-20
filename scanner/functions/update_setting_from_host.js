function update_setting_from_host(setting, value) {
		if (value !== void 0) {
			if (typeof settings[setting] === "number") {
				value = parseFloat(value);
			}
			user_defined_settings[setting] = value;
			if (value !== settings[setting]) {
				settings[setting] = value;
				return true;
			}
		}
		return false;
	}