function isWSPorZWSPText(text) {
		return WSP_CHARACTERS.test(text) || ZWSP_CHARACTERS.test(text);
	}