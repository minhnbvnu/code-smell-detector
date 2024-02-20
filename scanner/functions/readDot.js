function readDot() {
	if (isWhitespace(port.peekChar()))
	    return new sc_Token(10/*DOT*/);
	else
	    return readIdOrNumber(".");
    }