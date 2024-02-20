function attribute_value_single_quoted_state(buffer) {
		var data = buffer.char();
		if (data === InputStream.EOF) {
			tokenizer._parseError("eof-in-attribute-value-single-quote");
			buffer.unget(data);
			tokenizer.setState(data_state);
		} else if (data === "'") {
			tokenizer.setState(after_attribute_value_state);
		} else if (data === '&') {
			this._additionalAllowedCharacter = "'";
			tokenizer.setState(character_reference_in_attribute_value_state);
		} else if (data === '\u0000') {
			tokenizer._parseError("invalid-codepoint");
			tokenizer._currentAttribute().nodeValue += "\uFFFD";
		} else {
			tokenizer._currentAttribute().nodeValue += data + buffer.matchUntil("\u0000|['&]");
		}
		return true;
	}