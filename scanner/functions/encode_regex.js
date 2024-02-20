function encode_regex(str) {
		return str.replace(/([\^$])/g, "\\$1");
	}