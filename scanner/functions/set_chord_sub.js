function set_chord_sub(str, value) {
			if (value) {
				if (!can_add_to_chord(str))
					return false;
				current_chord_timeout[str] = Date.now();
				if (array_indexof(current_chord, str) < 0) {
					current_chord.push(str);
					//console_log("+" + str);
					return true;
				}
			} else {
				delete current_chord_timeout[str];
				if (array_indexof(current_chord, str) >= 0) {
					current_chord.splice(array_indexof(current_chord, str), 1);
					clear_chord_if_only_wheel();
					//console_log("-" + str);
					return true;
				}
			}
			return false;
		}