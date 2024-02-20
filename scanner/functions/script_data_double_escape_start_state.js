function script_data_double_escape_start_state(buffer) {
		var data = buffer.char();
		if (isWhitespace(data) || data === '/' || data === '>') {
			tokenizer._emitToken({type: 'Characters', data: data});
			if (this._temporaryBuffer.toLowerCase() === 'script')
				tokenizer.setState(script_data_double_escaped_state);
			else
				tokenizer.setState(script_data_escaped_state);
		} else if (isAlpha(data)) {
			tokenizer._emitToken({type: 'Characters', data: data});
			this._temporaryBuffer += data;
			buffer.commit();
		} else {
			buffer.unget(data);
			tokenizer.setState(script_data_escaped_state);
		}
		return true;
	}