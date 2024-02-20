function update_chord(e, value) {
			var map = get_keystrs_map(e, value);
			remove_old_keys();
			var changed = false;
			for (var key in map) {
				if (set_chord_sub(key, map[key]))
					changed = true;
			}
			return changed;
		}