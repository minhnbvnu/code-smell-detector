function script_data_double_escaped_less_than_sign_state(buffer) {
		var data = buffer.char();
		if (data === '/') {
			tokenizer._emitToken({type: 'Characters', data: '/'});
			this._temporaryBuffer = '';
			tokenizer.setState(script_data_double_escape_end_state);
		} else {
			buffer.unget(data);
			tokenizer.setState(script_data_double_escaped_state);
		}
		return true;
	}