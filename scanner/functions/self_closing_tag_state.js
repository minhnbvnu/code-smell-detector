function self_closing_tag_state(buffer) {
		var c = buffer.char();
		if (c === InputStream.EOF) {
			tokenizer._parseError("unexpected-eof-after-solidus-in-tag");
			buffer.unget(c);
			tokenizer.setState(data_state);
		} else if (c === '>') {
			tokenizer._currentToken.selfClosing = true;
			tokenizer.setState(data_state);
			tokenizer._emitCurrentToken();
		} else {
			tokenizer._parseError("unexpected-character-after-solidus-in-tag");
			buffer.unget(c);
			tokenizer.setState(before_attribute_name_state);
		}
		return true;
	}