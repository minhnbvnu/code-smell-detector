function comment_end_state(buffer) {
		var data = buffer.char();
		if (data === InputStream.EOF) {
			tokenizer._parseError("eof-in-comment-double-dash");
			tokenizer._emitToken(tokenizer._currentToken);
			buffer.unget(data);
			tokenizer.setState(data_state);
		} else if (data === '>') {
			tokenizer._emitToken(tokenizer._currentToken);
			tokenizer.setState(data_state);
		} else if (data === '!') {
			tokenizer._parseError("unexpected-bang-after-double-dash-in-comment");
			tokenizer.setState(comment_end_bang_state);
		} else if (data === '-') {
			tokenizer._parseError("unexpected-dash-after-double-dash-in-comment");
			tokenizer._currentToken.data += data;
		} else if (data === '\u0000') {
			tokenizer._parseError("invalid-codepoint");
			tokenizer._currentToken.data += "--\uFFFD";
			tokenizer.setState(comment_state);
		} else {
			tokenizer._parseError("unexpected-char-in-comment");
			tokenizer._currentToken.data += '--' + data;
			tokenizer.setState(comment_state);
		}
		return true;
	}