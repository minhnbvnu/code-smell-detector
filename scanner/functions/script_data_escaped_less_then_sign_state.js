function script_data_escaped_less_then_sign_state(buffer) {
		var data = buffer.char();
		if (data === '/') {
			this._temporaryBuffer = '';
			tokenizer.setState(script_data_escaped_end_tag_open_state);
		} else if (isAlpha(data)) {
			tokenizer._emitToken({type: 'Characters', data: '<' + data});
			this._temporaryBuffer = data;
			tokenizer.setState(script_data_double_escape_start_state);
		} else {
			tokenizer._emitToken({type: 'Characters', data: '<'});
			buffer.unget(data);
			tokenizer.setState(script_data_escaped_state);
		}
		return true;
	}