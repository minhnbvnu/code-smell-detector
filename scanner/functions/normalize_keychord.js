function normalize_keychord(keychord) {
		if (keychord.length === 0)
			return [[]];
		if (!is_array(keychord[0]))
			return [keychord];
		return keychord;
	}