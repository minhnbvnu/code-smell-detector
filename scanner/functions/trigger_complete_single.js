function trigger_complete_single(wanted_chord) {
			for (var i = 0; i < wanted_chord.length; i++) {
				var key = wanted_chord[i];
				if (array_indexof(current_chord, key) < 0)
					return false;
			}
			// e.g. if the user presses shift+r, but the chord is r, then it should fail
			for (var i = 0; i < current_chord.length; i++) {
				if (keystr_is_wheel(current_chord[i]))
					continue;
				if (array_indexof(wanted_chord, current_chord[i]) < 0)
					return false;
			}
			return true;
		}