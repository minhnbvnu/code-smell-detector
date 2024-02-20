function skipWhitespaceAndComments() {
	var done = false;
	while (!done) {
	    done = true;
	    while (isWhitespace(port.peekChar()))
		port.readChar();
	    if (port.peekChar() === ';') {
		port.readChar();
		done = false;
		while (true) {
		    curChar = port.readChar();
		    if (curChar === SC_EOF_OBJECT ||
			curChar === '\n')
			break;
		}
	    }
	}
    }