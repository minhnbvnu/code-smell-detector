function getCharacterClassEscapeSet(character) {
		if (unicode) {
			if (ignoreCase) {
				return ESCAPE_SETS.UNICODE_IGNORE_CASE[character];
			}
			return ESCAPE_SETS.UNICODE[character];
		}
		return ESCAPE_SETS.REGULAR[character];
	}