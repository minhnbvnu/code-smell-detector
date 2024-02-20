function remove_old_keys() {
			var now = Date.now();
			for (var key in current_chord_timeout) {
				if (now - current_chord_timeout[key] > 5000)
					set_chord_sub(key, false);
			}
		}