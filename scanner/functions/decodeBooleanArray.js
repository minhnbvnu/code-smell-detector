function decodeBooleanArray(value) {
	return parseArray(value, x => x[0] === 't');
}