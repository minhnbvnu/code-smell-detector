function markup_declaration_open_state(buffer) {
		var chars = buffer.shift(2);
		if (chars === '--') {
			tokenizer._currentToken = {type: 'Comment', data: ''};
			tokenizer.setState(comment_start_state);
		} else {
			var newchars = buffer.shift(5);
			if (newchars === InputStream.EOF || chars === InputStream.EOF) {
				tokenizer._parseError("expected-dashes-or-doctype");
				tokenizer.setState(bogus_comment_state);
				buffer.unget(chars);
				return true;
			}

			chars += newchars;
			if (chars.toUpperCase() === 'DOCTYPE') {
				tokenizer._currentToken = {type: 'Doctype', name: '', publicId: null, systemId: null, forceQuirks: false};
				tokenizer.setState(doctype_state);
			} else if (tokenizer._tokenHandler.isCdataSectionAllowed() && chars === '[CDATA[') {
				tokenizer.setState(cdata_section_state);
			} else {
				tokenizer._parseError("expected-dashes-or-doctype");
				buffer.unget(chars);
				tokenizer.setState(bogus_comment_state);
			}
		}
		return true;
	}