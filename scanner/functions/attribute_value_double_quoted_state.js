function attribute_value_double_quoted_state(buffer) {
		var data = buffer.char();
		if (data === InputStream.EOF) {
			tokenizer._parseError("eof-in-attribute-value-double-quote");
			buffer.unget(data);
			tokenizer.setState(data_state);
		} else if (data === '"') {
			tokenizer.setState(after_attribute_value_state);
		} else if (data === '&') {
			this._additionalAllowedCharacter = '"';
			tokenizer.setState(character_reference_in_attribute_value_state);
		} else if (data === '\u0000') {
			tokenizer._parseError("invalid-codepoint");
			tokenizer._currentAttribute().nodeValue += "\uFFFD";
		} else {
			var s = buffer.matchUntil('[\0"&]');
			data = data + s;
			tokenizer._currentAttribute().nodeValue += data;
		}
		return true;
	}