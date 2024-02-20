function cdata_section_state(buffer) {
		var data = buffer.matchUntil(']]>');
		buffer.shift(3);
		if (data) {
			tokenizer._emitToken({type: 'Characters', data: data});
		}
		tokenizer.setState(data_state);
		return true;
	}