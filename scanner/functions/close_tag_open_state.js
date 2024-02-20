function close_tag_open_state(buffer) {
		var data = buffer.char();
		if (data === InputStream.EOF) {
			tokenizer._parseError("expected-closing-tag-but-got-eof");
			tokenizer._emitToken({type: 'Characters', data: '</'});
			buffer.unget(data);
			tokenizer.setState(data_state);
		} else if (isAlpha(data)) {
			tokenizer._currentToken = {type: 'EndTag', name: data.toLowerCase(), data: []};
			tokenizer.setState(tag_name_state);
		} else if (data === '>') {
			tokenizer._parseError("expected-closing-tag-but-got-right-bracket");
			tokenizer.setState(data_state);
		} else {
			tokenizer._parseError("expected-closing-tag-but-got-char", {data: data}); // param 1 is datavars:
			buffer.unget(data);
			tokenizer.setState(bogus_comment_state);
		}
		return true;
	}