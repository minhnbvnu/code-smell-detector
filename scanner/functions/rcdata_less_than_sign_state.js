function rcdata_less_than_sign_state(buffer) {
		var data = buffer.char();
		if (data === "/") {
			this._temporaryBuffer = '';
			tokenizer.setState(rcdata_end_tag_open_state);
		} else {
			tokenizer._emitToken({type: 'Characters', data: '<'});
			buffer.unget(data);
			tokenizer.setState(rcdata_state);
		}
		return true;
	}