function trimWhitespaceCharacters(str) {
		return str
			.replace(WSP_CHARACTERS_LEFT, '')
			.replace(WSP_CHARACTERS_RIGHT, '')
			.replace(ZWSP_CHARACTERS_LEFT, '')
			.replace(ZWSP_CHARACTERS_RIGHT, '');
	}