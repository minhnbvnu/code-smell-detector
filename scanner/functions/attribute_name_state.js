function attribute_name_state(buffer) {
		var data = buffer.char();
		var leavingThisState = true;
		var shouldEmit = false;
		if (data === InputStream.EOF) {
			tokenizer._parseError("eof-in-attribute-name");
			buffer.unget(data);
			tokenizer.setState(data_state);
			shouldEmit = true;
		} else if (data === '=') {
			tokenizer.setState(before_attribute_value_state);
		} else if (isAlpha(data)) {
			tokenizer._currentAttribute().nodeName += data.toLowerCase();
			leavingThisState = false;
		} else if (data === '>') {
			shouldEmit = true;
		} else if (isWhitespace(data)) {
			tokenizer.setState(after_attribute_name_state);
		} else if (data === '/') {
			tokenizer.setState(self_closing_tag_state);
		} else if (data === "'" || data === '"') {
			tokenizer._parseError("invalid-character-in-attribute-name");
			tokenizer._currentAttribute().nodeName += data;
			leavingThisState = false;
		} else if (data === '\u0000') {
			tokenizer._parseError("invalid-codepoint");
			tokenizer._currentAttribute().nodeName += "\uFFFD";
		} else {
			tokenizer._currentAttribute().nodeName += data;
			leavingThisState = false;
		}

		if (leavingThisState) {
			var attributes = tokenizer._currentToken.data;
			var currentAttribute = attributes[attributes.length - 1];
			for (var i = attributes.length - 2; i >= 0; i--) {
				if (currentAttribute.nodeName === attributes[i].nodeName) {
					tokenizer._parseError("duplicate-attribute", {name: currentAttribute.nodeName});
					currentAttribute.nodeName = null;
					break;
				}
			}
			if (shouldEmit)
				tokenizer._emitCurrentToken();
		} else {
			buffer.commit();
		}
		return true;
	}