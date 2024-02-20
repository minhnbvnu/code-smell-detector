function after_doctype_name_state(buffer) {
		var data = buffer.char();
		if (data === InputStream.EOF) {
			tokenizer._currentToken.forceQuirks = true;
			buffer.unget(data);
			tokenizer._parseError("eof-in-doctype");
			tokenizer.setState(data_state);
			tokenizer._emitCurrentToken();
		} else if (isWhitespace(data)) {
		} else if (data === '>') {
			tokenizer.setState(data_state);
			tokenizer._emitCurrentToken();
		} else {
			if (['p', 'P'].indexOf(data) > -1) {
				var expected = [['u', 'U'], ['b', 'B'], ['l', 'L'], ['i', 'I'], ['c', 'C']];
				var matched = expected.every(function(expected){
					data = buffer.char();
					return expected.indexOf(data) > -1;
				});
				if (matched) {
					tokenizer.setState(after_doctype_public_keyword_state);
					return true;
				}
			} else if (['s', 'S'].indexOf(data) > -1) {
				var expected = [['y', 'Y'], ['s', 'S'], ['t', 'T'], ['e', 'E'], ['m', 'M']];
				var matched = expected.every(function(expected){
					data = buffer.char();
					return expected.indexOf(data) > -1;
				});
				if (matched) {
					tokenizer.setState(after_doctype_system_keyword_state);
					return true;
				}
			}
			buffer.unget(data);
			tokenizer._currentToken.forceQuirks = true;

			if (data === InputStream.EOF) {
				tokenizer._parseError("eof-in-doctype");
				buffer.unget(data);
				tokenizer.setState(data_state);
				tokenizer._emitCurrentToken();
			} else {
				tokenizer._parseError("expected-space-or-right-bracket-in-doctype", {data: data});
				tokenizer.setState(bogus_doctype_state);
			}
		}
		return true;
	}