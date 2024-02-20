function attribute_value_unquoted_state(buffer) {
		var data = buffer.char();
		if (data === InputStream.EOF) {
			tokenizer._parseError("eof-after-attribute-value");
			buffer.unget(data);
			tokenizer.setState(data_state);
		} else if (isWhitespace(data)) {
			tokenizer.setState(before_attribute_name_state);
		} else if (data === '&') {
			this._additionalAllowedCharacter = ">";
			tokenizer.setState(character_reference_in_attribute_value_state);
		} else if (data === '>') {
			tokenizer._emitCurrentToken();
		} else if (data === '"' || data === "'" || data === '=' || data === '`' || data === '<') {
			tokenizer._parseError("unexpected-character-in-unquoted-attribute-value");
			tokenizer._currentAttribute().nodeValue += data;
			buffer.commit();
		} else if (data === '\u0000') {
			tokenizer._parseError("invalid-codepoint");
			tokenizer._currentAttribute().nodeValue += "\uFFFD";
		} else {
			var o = buffer.matchUntil("\u0000|["+ "\t\n\v\f\x20\r" + "&<>\"'=`" +"]");
			if (o === InputStream.EOF) {
				tokenizer._parseError("eof-in-attribute-value-no-quotes");
				tokenizer._emitCurrentToken();
			}
			buffer.commit();
			tokenizer._currentAttribute().nodeValue += data + o;
		}
		return true;
	}