function update_options_chord_sub(str, value) {
			if (value) {
				if (array_indexof(options_chord, str) < 0) {
					options_chord.push(str);
				}
				if (array_indexof(current_options_chord, str) < 0) {
					current_options_chord.push(str);
				}
			} else {
				if (array_indexof(current_options_chord, str) >= 0) {
					current_options_chord.splice(array_indexof(current_options_chord, str), 1);
				}
			}
		}