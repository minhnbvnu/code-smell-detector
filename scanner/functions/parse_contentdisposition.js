function parse_contentdisposition(cdp) {
	var out = [];
	var current_kv = [];
	var current = "";
	var in_quote = false;
	for (var i = 0; i < cdp.length; i++) {
		var c = cdp[i];

		if (!in_quote && c == ";") {
			if (current.length > 0) {
				if (current_kv.length === 0)
					current = current.toLowerCase();
				current_kv.push(current);
			}

			out.push(current_kv);
			current_kv = [];
			current = "";
			in_quote = false;
		}

		if (!in_quote && /\s/.test(c)) {
			continue;
		}

		if (current_kv.length !== 0) {
			if (in_quote && c === in_quote) {
				in_quote = false;
			} else if (!in_quote && (c === "'" || c === '"')) {
				in_quote = c;
			}
		} else {
			if (c === "=") {
				current_kv.push(current.toLowerCase());
				current = "";
				in_quote = false;
				continue;
			}
		}

		current += c;
	}

	if (current.length > 0)
		current_kv.push(current);

	if (current_kv.length > 0)
		out.push(current_kv);

	return out;
}