function tag_open_state(buffer) {
		var data = buffer.char();
		if (data === InputStream.EOF) {
			tokenizer._parseError("bare-less-than-sign-at-eof");
			tokenizer._emitToken({type: 'Characters', data: '<'});
			buffer.unget(data);
			tokenizer.setState(data_state);
		} else if (isAlpha(data)) {
			tokenizer._currentToken = {type: 'StartTag', name: data.toLowerCase(), data: []};
			tokenizer.setState(tag_name_state);
		} else if (data === '!') {
			tokenizer.setState(markup_declaration_open_state);
		} else if (data === '/') {
			tokenizer.setState(close_tag_open_state);
		} else if (data === '>') {
			tokenizer._parseError("expected-tag-name-but-got-right-bracket");
			tokenizer._emitToken({type: 'Characters', data: "<>"});
			tokenizer.setState(data_state);
		} else if (data === '?') {
			tokenizer._parseError("expected-tag-name-but-got-question-mark");
			buffer.unget(data);
			tokenizer.setState(bogus_comment_state);
		} else {
			tokenizer._parseError("expected-tag-name");
			tokenizer._emitToken({type: 'Characters', data: "<"});
			buffer.unget(data);
			tokenizer.setState(data_state);
		}
		return true;
	}