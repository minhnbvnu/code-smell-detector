function script_data_state(buffer) {
		var data = buffer.char();
		if (data === InputStream.EOF) {
			tokenizer._emitToken({type: 'EOF', data: null});
			return false;
		} else if (data === '<') {
			tokenizer.setState(script_data_less_than_sign_state);
		} else if (data === '\u0000') {
			tokenizer._parseError("invalid-codepoint");
			tokenizer._emitToken({type: 'Characters', data: '\uFFFD'});
			buffer.commit();
		} else {
			var chars = buffer.matchUntil("<|\u0000");
			tokenizer._emitToken({type: 'Characters', data: data + chars});
		}
		return true;
	}