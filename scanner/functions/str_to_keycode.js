function str_to_keycode(x) {
		if (x in str_to_keycode_table) {
			return str_to_keycode_table[x];
		}
		return x.toUpperCase().charCodeAt(0);
	}