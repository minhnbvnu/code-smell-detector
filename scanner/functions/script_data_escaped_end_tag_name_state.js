function script_data_escaped_end_tag_name_state(buffer) {
		var appropriate = tokenizer._currentToken && (tokenizer._currentToken.name === this._temporaryBuffer.toLowerCase());
		var data = buffer.char();
		if (isWhitespace(data) && appropriate) {
			tokenizer._currentToken = {type: 'EndTag', name: 'script', data: [], selfClosing: false};
			tokenizer.setState(before_attribute_name_state);
		} else if (data === '/' && appropriate) {
			tokenizer._currentToken = {type: 'EndTag', name: 'script', data: [], selfClosing: false};
			tokenizer.setState(self_closing_tag_state);
		} else if (data === '>' &&  appropriate) {
			tokenizer._currentToken = {type: 'EndTag', name: 'script', data: [], selfClosing: false};
			tokenizer.setState(data_state);
			tokenizer._emitCurrentToken();
		} else if (isAlpha(data)) {
			this._temporaryBuffer += data;
			buffer.commit();
		} else {
			tokenizer._emitToken({type: 'Characters', data: '</' + this._temporaryBuffer});
			buffer.unget(data);
			tokenizer.setState(script_data_escaped_state);
		}
		return true;
	}