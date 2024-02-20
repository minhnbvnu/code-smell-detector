function event_in_chord(e, wanted_chord) {
			wanted_chord = normalize_keychord(wanted_chord);
			for (var i = 0; i < wanted_chord.length; i++) {
				if (event_in_single_chord(e, wanted_chord[i]))
					return true;
			}
			return false;
		}