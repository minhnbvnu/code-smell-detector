function fuzzify_text(str) {
		return str
			.replace(/(?:[-=_!?$#"'’‘”“]|\[|])/g, " ")
			.replace(/\s+/g, " ")
			.replace(/^\s+|\s+$/g, "");
	}