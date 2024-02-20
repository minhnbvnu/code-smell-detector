function between_doctype_public_and_system_identifiers_state(buffer) {
		var data = buffer.char();
		if (data === InputStream.EOF) {
			tokenizer._parseError("eof-in-doctype");
			tokenizer._currentToken.forceQuirks = true;
			tokenizer._emitCurrentToken();
			buffer.unget(data);
			tokenizer.setState(data_state);
		} else if (isWhitespace(data)) {
		} else if (data === '>') {
			tokenizer._emitCurrentToken();
			tokenizer.setState(data_state);
		} else if (data === '"') {
			tokenizer._currentToken.systemId = '';
			tokenizer.setState(doctype_system_identifier_double_quoted_state);
		} else if (data === "'") {
			tokenizer._currentToken.systemId = '';
			tokenizer.setState(doctype_system_identifier_single_quoted_state);
		} else {
			tokenizer._parseError("unexpected-char-in-doctype");
			tokenizer._currentToken.forceQuirks = true;
			tokenizer.setState(bogus_doctype_state);
		}
		return true;
	}