function isWhitespaceOrEOF(c) {
	return isWhitespace(c) || c === SC_EOF_OBJECT;
    }