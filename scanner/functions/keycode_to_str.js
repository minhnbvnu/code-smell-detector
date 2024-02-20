function keycode_to_str(event) {
		var x = event.which;
		if (event.code) {
			// when pressing Shift
			var match = event.code.match(/^Numpad([0-9]+)$/);
			if (match) {
				return match[1];
			}
			;
		}
		if (x in keycode_to_str_table) {
			return keycode_to_str_table[x];
		}
		if (!((x >= 65 && x <= 90) ||
			// numbers
			(x >= 48 && x <= 57))) {
			return;
		}
		return string_fromcharcode(x).toLowerCase();
	}