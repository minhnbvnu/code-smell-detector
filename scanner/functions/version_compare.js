function version_compare(a, b) {
		// just in case
		if (typeof a !== "string" || typeof b !== "string")
			return null;
		var version_regex = /^[0-9]+(\.[0-9]+){0,}$/;
		if (!version_regex.test(a) ||
			!version_regex.test(b))
			return null;
		var a_split = a.split(".");
		var b_split = b.split(".");
		if (a_split.length !== b_split.length) {
			_version_compare_pad_0(a_split, b_split.length - a_split.length);
			_version_compare_pad_0(b_split, a_split.length - b_split.length);
		}
		for (var i = 0; i < a_split.length; i++) {
			var an = parse_int(a_split[i]);
			var bn = parse_int(b_split[i]);
			if (an < bn)
				return 1;
			if (an > bn)
				return -1;
		}
		return 0;
	}