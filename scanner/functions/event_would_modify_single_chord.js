function event_would_modify_single_chord(e, value, wanted_chord) {
			var map = get_keystrs_map(e, value);
			for (var key in map) {
				if (wanted_chord !== void 0 && !keystr_in_trigger(key, wanted_chord))
					continue;
				if (key_would_modify_single_chord(key, map[key]))
					return true;
			}
			return false;
		}