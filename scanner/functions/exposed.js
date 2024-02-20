function exposed() {
		// Try deprecated arg signature first:
		return deprecated.apply(null, arguments) || findAndReplaceDOMText.apply(null, arguments);
	}