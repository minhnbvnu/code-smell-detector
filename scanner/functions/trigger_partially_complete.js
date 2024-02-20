function trigger_partially_complete(e, wanted_chord) {
			wanted_chord = normalize_keychord(wanted_chord);
			for (var i = 0; i < wanted_chord.length; i++) {
				if (trigger_partially_complete_single(e, wanted_chord[i]))
					return true;
			}
			return false;
		}