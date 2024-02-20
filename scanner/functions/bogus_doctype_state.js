function bogus_doctype_state(buffer) {
		var data = buffer.char();
		if (data === InputStream.EOF) {
			buffer.unget(data);
			tokenizer._emitCurrentToken();
			tokenizer.setState(data_state);
		} else if (data === '>') {
			tokenizer._emitCurrentToken();
			tokenizer.setState(data_state);
		}
		return true;
	}