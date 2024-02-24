function after_doctype_system_keyword_state(buffer) {
		var data = buffer.char();
		if (data === InputStream.EOF) {
			tokenizer._parseError("eof-in-doctype");
			tokenizer._currentToken.forceQuirks = true;
			tokenizer._emitCurrentToken();
			buffer.unget(data);
			tokenizer.setState(data_state);
		} else if (isWhitespace(data)) {
			tokenizer.setState(before_doctype_system_identifier_state);
		} else if (data === "'" || data === '"') {
			tokenizer._parseError("unexpected-char-in-doctype");
			buffer.unget(data);
			tokenizer.setState(before_doctype_system_identifier_state);
		} else {
			buffer.unget(data);
			tokenizer.setState(before_doctype_system_identifier_state);
		}
		return true;
	}