function get_single_setting_raw(value) {
		if (is_array(value))
			return value[0];
		return value;
	}