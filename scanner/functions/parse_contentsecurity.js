function parse_contentsecurity(csp) {
	var obj = {};

	var splitted = csp.split(/\s*;\s*/);
	for (var i = 0; i < splitted.length; i++) {
		var sources = splitted[i].split(/\s+/);
		var name = sources.shift();

		if (name in obj) {
			[].push.apply(obj[name], sources);
		} else {
			obj[name] = sources;
		}
	}

	return obj;
}