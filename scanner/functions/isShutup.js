function isShutup(string) {
		return string.toLowerCase().match(/.*?shut\s?up.*?/) !== null ||
			string.toLowerCase().match(/.*?be\s?quiet.*?/);
	}