function isWhyQuestion(string) {
		return string.toLowerCase().match(/.*?why.*?\?.*?/) !== null;
	}