function fuzzy_date_compare(a, b) {
		if (a === b)
			return true;
		if (a.length !== 8 || b.length !== 8)
			return false;
		var a_d = parse_int(a.substr(6, 2));
		var b_d = parse_int(b.substr(6, 2));
		if (!_fuzzy_compare_rollover(a_d, b_d, [28, 29, 30, 31]))
			return false;
		var a_m = parse_int(a.substr(4, 2));
		var b_m = parse_int(b.substr(4, 2));
		var d_rollover = _is_larger_rollover(a_d, b_d, [28, 29, 30, 31]);
		if (a_m !== b_m) {
			if (!d_rollover)
				return false;
			if (!_fuzzy_compare_rollover(a_m, b_m, [12]))
				return false;
		}
		var a_y = parse_int(a.substr(0, 4));
		var b_y = parse_int(b.substr(0, 4));
		if (a_y !== b_y) {
			if (!d_rollover || !_is_larger_rollover(a_m, b_m, [12]))
				return false;
			if (!_fuzzy_compare_rollover(a_y, b_y, []))
				return false;
		}
		return true;
	}