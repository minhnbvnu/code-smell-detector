function key_would_modify_single_chord(str, value) {
			if (value) {
				if (!can_add_to_chord(str))
					return false;
				if (array_indexof(current_chord, str) < 0)
					return true;
			} else {
				if (array_indexof(current_chord, str) >= 0)
					return true;
			}
			return false;
		}