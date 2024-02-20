function can_add_to_chord(str) {
			if (!keystr_is_wheel(str))
				return true;
			return !chord_is_only_wheel(current_chord);
		}