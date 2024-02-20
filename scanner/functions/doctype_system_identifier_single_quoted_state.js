function doctype_system_identifier_single_quoted_state(buffer) {
		var data = buffer.char();
		if (data === InputStream.EOF) {
			tokenizer._parseError("eof-in-doctype");
			tokenizer._currentToken.forceQuirks = true;
			tokenizer._emitCurrentToken();
			buffer.unget(data);
			tokenizer.setState(data_state);
		} else if (data === "'") {
			tokenizer.setState(after_doctype_system_identifier_state);
		} else if (data === '>') {
			tokenizer._parseError("unexpected-end-of-doctype");
			tokenizer._currentToken.forceQuirks = true;
			tokenizer._emitCurrentToken();
			tokenizer.setState(data_state);
		} else {
			tokenizer._currentToken.systemId += data;
		}
		return true;
	}