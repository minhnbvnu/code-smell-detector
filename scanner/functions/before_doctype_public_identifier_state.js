function before_doctype_public_identifier_state(buffer) {
		var data = buffer.char();
		if (data === InputStream.EOF) {
			tokenizer._parseError("eof-in-doctype");
			tokenizer._currentToken.forceQuirks = true;
			buffer.unget(data);
			tokenizer.setState(data_state);
			tokenizer._emitCurrentToken();
		} else if (isWhitespace(data)) {
		} else if (data === '"') {
			tokenizer._currentToken.publicId = '';
			tokenizer.setState(doctype_public_identifier_double_quoted_state);
		} else if (data === "'") {
			tokenizer._currentToken.publicId = '';
			tokenizer.setState(doctype_public_identifier_single_quoted_state);
		} else if (data === '>') {
			tokenizer._parseError("unexpected-end-of-doctype");
			tokenizer._currentToken.forceQuirks = true;
			tokenizer.setState(data_state);
			tokenizer._emitCurrentToken();
		} else {
			tokenizer._parseError("unexpected-char-in-doctype");
			tokenizer._currentToken.forceQuirks = true;
			tokenizer.setState(bogus_doctype_state);
		}
		return true;
	}