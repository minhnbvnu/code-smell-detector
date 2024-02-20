function comment_state(buffer) {
		var data = buffer.char();
		if (data === InputStream.EOF) {
			tokenizer._parseError("eof-in-comment");
			tokenizer._emitToken(tokenizer._currentToken);
			buffer.unget(data);
			tokenizer.setState(data_state);
		} else if (data === '-') {
			tokenizer.setState(comment_end_dash_state);
		} else if (data === '\u0000') {
			tokenizer._parseError("invalid-codepoint");
			tokenizer._currentToken.data += "\uFFFD";
		} else {
			tokenizer._currentToken.data += data;
			buffer.commit();
		}
		return true;
	}