function data_state(buffer) {
		var data = buffer.char();
		if (data === InputStream.EOF) {
			tokenizer._emitToken({type: 'EOF', data: null});
			return false;
		} else if (data === '&') {
			tokenizer.setState(character_reference_in_data_state);
		} else if (data === '<') {
			tokenizer.setState(tag_open_state);
		} else if (data === '\u0000') {
			tokenizer._emitToken({type: 'Characters', data: data});
			buffer.commit();
		} else {
			var chars = buffer.matchUntil("&|<|\u0000");
			tokenizer._emitToken({type: 'Characters', data: data + chars});
			buffer.commit();
		}
		return true;
	}