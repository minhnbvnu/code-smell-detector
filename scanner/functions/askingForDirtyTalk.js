function askingForDirtyTalk(string) {
		return string.indexOf('horny') !== -1 ||
			string.indexOf('sex') !== -1 ||
			string.indexOf('fuck') !== -1 ||
			string.match(/.*?dirty.*?talk.*?/) !== null ||
			string.match(/.*?talk.*?dirty.*?/) !== null ||
			string.indexOf('stick') !== -1 ||
			string.indexOf('seduce') !== -1 ||
			string.indexOf('plug') !== -1;
	}