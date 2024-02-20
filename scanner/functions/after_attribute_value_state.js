function after_attribute_value_state(buffer) {
		var data = buffer.char();
		if (data === InputStream.EOF) {
			tokenizer._parseError("eof-after-attribute-value");
			buffer.unget(data);
			tokenizer.setState(data_state);
		} else if (isWhitespace(data)) {
			tokenizer.setState(before_attribute_name_state);
		} else if (data === '>') {
			tokenizer.setState(data_state);
			tokenizer._emitCurrentToken();
		} else if (data === '/') {
			tokenizer.setState(self_closing_tag_state);
		} else {
			tokenizer._parseError("unexpected-character-after-attribute-value");
			buffer.unget(data);
			tokenizer.setState(before_attribute_name_state);
		}
		return true;
	}