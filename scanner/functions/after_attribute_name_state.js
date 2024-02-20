function after_attribute_name_state(buffer) {
		var data = buffer.char();
		if (data === InputStream.EOF) {
			tokenizer._parseError("expected-end-of-tag-but-got-eof");
			buffer.unget(data);
			tokenizer.setState(data_state);
		} else if (isWhitespace(data)) {
			return true;
		} else if (data === '=') {
			tokenizer.setState(before_attribute_value_state);
		} else if (data === '>') {
			tokenizer._emitCurrentToken();
		} else if (isAlpha(data)) {
			tokenizer._currentToken.data.push({nodeName: data, nodeValue: ""});
			tokenizer.setState(attribute_name_state);
		} else if (data === '/') {
			tokenizer.setState(self_closing_tag_state);
		} else if (data === "'" || data === '"' || data === '<') {
			tokenizer._parseError("invalid-character-after-attribute-name");
			tokenizer._currentToken.data.push({nodeName: data, nodeValue: ""});
			tokenizer.setState(attribute_name_state);
		} else if (data === '\u0000') {
			tokenizer._parseError("invalid-codepoint");
			tokenizer._currentToken.data.push({nodeName: "\uFFFD", nodeValue: ""});
		} else {
			tokenizer._currentToken.data.push({nodeName: data, nodeValue: ""});
			tokenizer.setState(attribute_name_state);
		}
		return true;
	}