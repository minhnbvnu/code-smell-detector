function trigger_partially_complete_single(e, wanted_chord) {
			for (var i = 0; i < wanted_chord.length; i++) {
				var key = wanted_chord[i];
				if (array_indexof(current_chord, key) >= 0)
					return true;
			}
			return false;
		}