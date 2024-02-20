function isStrongStatement(string) {
		return string.toLowerCase().match(/.*?\!$/) !== null;
	}