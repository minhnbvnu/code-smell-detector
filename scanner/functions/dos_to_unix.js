function dos_to_unix(text) {
		return text.replace(/\r*\n/g, "\n");
	}