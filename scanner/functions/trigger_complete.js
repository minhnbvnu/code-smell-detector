function trigger_complete(wanted_chord) {
			wanted_chord = normalize_keychord(wanted_chord);
			for (var i = 0; i < wanted_chord.length; i++) {
				if (trigger_complete_single(wanted_chord[i]))
					return true;
			}
			return false;
		}