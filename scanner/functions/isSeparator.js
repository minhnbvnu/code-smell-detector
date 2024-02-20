function isSeparator(str, i) {
	var char = str[i];
	return i > 0 && (char === '/' || (isWin && char === '\\'));
}