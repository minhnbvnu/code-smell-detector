function comment_end_bang_state(buffer) {
		var data = buffer.char();
		if (data === InputStream.EOF) {
			tokenizer._parseError("eof-in-comment-end-bang-state");
			tokenizer._emitToken(tokenizer._currentToken);
			buffer.unget(data);
			tokenizer.setState(data_state);
		} else if (data === '>') {
			tokenizer._emitToken(tokenizer._currentToken);
			tokenizer.setState(data_state);
		} else if (data === '-') {
			tokenizer._currentToken.data += '--!';
			tokenizer.setState(comment_end_dash_state);
		} else {
			tokenizer._currentToken.data += '--!' + data;
			tokenizer.setState(comment_state);
		}
		return true;
	}