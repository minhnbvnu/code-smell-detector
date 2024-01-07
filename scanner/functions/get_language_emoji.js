function get_language_emoji(locale) {
		var split = locale.toUpperCase().split(/-|_/);
		var lang = split.shift();
		var code = split.pop();

		if (!/^[A-Z]{2}$/.test(code)) {
			code = language_to_default_region[lang.toLowerCase()];
		}

		if (!code) {
			return '';
		}

		const a = String.fromCodePoint(code.codePointAt(0) - 0x41 + 0x1F1E6);
		const b = String.fromCodePoint(code.codePointAt(1) - 0x41 + 0x1F1E6);
		return a + b;
	}