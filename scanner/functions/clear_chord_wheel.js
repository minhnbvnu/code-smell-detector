function clear_chord_wheel() {
			for (var i = 0; i < current_chord.length; i++) {
				if (keystr_is_wheel(current_chord[i])) {
					current_chord.splice(i, 1);
					i--;
				}
			}
		}