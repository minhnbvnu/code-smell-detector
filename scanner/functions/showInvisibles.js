function showInvisibles(str) {
	return str
		.replace(/^ +/gm, spaces => repeat('•', spaces.length))
		.replace(/ +$/gm, spaces => repeat('•', spaces.length))
		.replace(/^\t+/gm, tabs => repeat('›   ', tabs.length))
		.replace(/\t+$/gm, tabs => repeat('›   ', tabs.length));
}