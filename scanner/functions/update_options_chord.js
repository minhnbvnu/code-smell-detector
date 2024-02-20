function update_options_chord(event, value) {
			if (!recording_keys)
				return;
			var map = get_keystrs_map(event, value);
			if ((keycode_to_str(event) || event.type === "mousedown") &&
				current_options_chord.length === 0) {
				// Don't clear the options chord for either left or right mouse buttons
				if (event.button !== 0 && event.button !== 2)
					options_chord = [];
			}
			var old_options_chord = deepcopy(options_chord);
			for (var key in map) {
				update_options_chord_sub(key, map[key]);
			}
			if (keysequence_bad(options_chord))
				options_chord = old_options_chord;
			recording_keys();
		}