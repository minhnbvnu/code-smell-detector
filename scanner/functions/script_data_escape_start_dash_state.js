function script_data_escape_start_dash_state(buffer) {
		var data = buffer.char();
		if (data === '-') {
			tokenizer._emitToken({type: 'Characters', data: '-'});
			tokenizer.setState(script_data_escaped_dash_dash_state);
		} else {
			buffer.unget(data);
			tokenizer.setState(script_data_state);
		}
		return true;
	}