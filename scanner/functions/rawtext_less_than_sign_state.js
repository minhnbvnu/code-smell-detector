function rawtext_less_than_sign_state(buffer) {
		var data = buffer.char();
		if (data === "/") {
			this._temporaryBuffer = '';
			tokenizer.setState(rawtext_end_tag_open_state);
		} else {
			tokenizer._emitToken({type: 'Characters', data: '<'});
			buffer.unget(data);
			tokenizer.setState(rawtext_state);
		}
		return true;
	}