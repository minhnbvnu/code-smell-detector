function isWhitespaceOrReplacementCharacter(ch) {
	return isWhitespace(ch) || ch === '\uFFFD';
}