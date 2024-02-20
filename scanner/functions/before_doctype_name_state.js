function before_doctype_name_state(buffer) {
		var data = buffer.char();
		if (data === InputStream.EOF) {
			tokenizer._parseError("expected-doctype-name-but-got-eof");
			tokenizer._currentToken.forceQuirks = true;
			buffer.unget(data);
			tokenizer.setState(data_state);
			tokenizer._emitCurrentToken();
		} else if (isWhitespace(data)) {
		} else if (data === '>') {
			tokenizer._parseError("expected-doctype-name-but-got-right-bracket");
			tokenizer._currentToken.forceQuirks = true;
			tokenizer.setState(data_state);
			tokenizer._emitCurrentToken();
		} else {
			if (isAlpha(data))
				data = data.toLowerCase();
			tokenizer._currentToken.name = data;
			tokenizer.setState(doctype_name_state);
		}
		return true;
	}