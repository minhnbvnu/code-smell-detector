function get_language() {
		if (typeof navigator === "undefined")
			return "en";
		if (navigator.languages)
			return navigator.languages[0];
		return navigator.language || navigator.userLanguage;
	}