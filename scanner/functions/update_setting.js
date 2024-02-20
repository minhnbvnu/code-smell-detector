function update_setting(key, value) {
		if (value === settings[key])
			return false;
		value = deepcopy(value);
		settings[key] = value;
		if (is_extension) {
			if (!(key in settings_history))
				settings_history[key] = [];
			settings_history[key].push(value);
		}
		set_value(key, value);
		return true;
	}