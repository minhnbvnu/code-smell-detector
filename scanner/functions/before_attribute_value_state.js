function before_attribute_value_state(buffer) {
		var data = buffer.char();
		if (data === InputStream.EOF) {
			tokenizer._parseError("expected-attribute-value-but-got-eof");
			buffer.unget(data);
			tokenizer.setState(data_state);
		} else if (isWhitespace(data)) {
			return true;
		} else if (data === '"') {
			tokenizer.setState(attribute_value_double_quoted_state);
		} else if (data === '&') {
			tokenizer.setState(attribute_value_unquoted_state);
			buffer.unget(data);
		} else if (data === "'") {
			tokenizer.setState(attribute_value_single_quoted_state);
		} else if (data === '>') {
			tokenizer._parseError("expected-attribute-value-but-got-right-bracket");
			tokenizer._emitCurrentToken();
		} else if (data === '=' || data === '<' || data === '`') {
			tokenizer._parseError("unexpected-character-in-unquoted-attribute-value");
			tokenizer._currentAttribute().nodeValue += data;
			tokenizer.setState(attribute_value_unquoted_state);
		} else if (data === '\u0000') {
			tokenizer._parseError("invalid-codepoint");
			tokenizer._currentAttribute().nodeValue += "\uFFFD";
		} else {
			tokenizer._currentAttribute().nodeValue += data;
			tokenizer.setState(attribute_value_unquoted_state);
		}

		return true;
	}