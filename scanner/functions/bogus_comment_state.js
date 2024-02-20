function bogus_comment_state(buffer) {
		var data = buffer.matchUntil('>');
		data = data.replace(/\u0000/g, "\uFFFD");
		buffer.char();
		tokenizer._emitToken({type: 'Comment', data: data});
		tokenizer.setState(data_state);
		return true;
	}