function script_data_escaped_dash_state(buffer) {
		var data = buffer.char();
		if (data === InputStream.EOF) {
			buffer.unget(data);
			tokenizer.setState(data_state);
		} else if (data === '-') {
			tokenizer._emitToken({type: 'Characters', data: '-'});
			tokenizer.setState(script_data_escaped_dash_dash_state);
		} else if (data === '<') {
			tokenizer.setState(script_data_escaped_less_then_sign_state);
		} else if (data === '\u0000') {
			tokenizer._parseError("invalid-codepoint");
			tokenizer._emitToken({type: 'Characters', data: '\uFFFD'});
			tokenizer.setState(script_data_escaped_state);
		} else {
			tokenizer._emitToken({type: 'Characters', data: data});
			tokenizer.setState(script_data_escaped_state);
		}
		return true;
	}