function event_would_modify_chord(e, value, wanted_chord) {
			wanted_chord = normalize_keychord(wanted_chord);
			for (var i = 0; i < wanted_chord.length; i++) {
				if (event_would_modify_single_chord(e, value, wanted_chord[i]))
					return true;
			}
			return false;
		}