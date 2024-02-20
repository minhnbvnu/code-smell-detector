function rawtext_end_tag_open_state(buffer) {
		var data = buffer.char();
		if (isAlpha(data)) {
			this._temporaryBuffer += data;
			tokenizer.setState(rawtext_end_tag_name_state);
		} else {
			tokenizer._emitToken({type: 'Characters', data: '</'});
			buffer.unget(data);
			tokenizer.setState(rawtext_state);
		}
		return true;
	}