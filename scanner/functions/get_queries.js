function get_queries(url, options) {
		// TODO: handle things like: ?a=b&c=b#&d=e
		var querystring = url
			.replace(/#.*/, "")
			.replace(/^.*?\?/, "");
		if (!querystring || querystring === url)
			return {};
		if (!options) {
			options = {};
		}
		var queries = {};
		var splitted = querystring.split("&");
		for (var i = 0; i < splitted.length; i++) {
			var name = splitted[i];
			var value = true;
			var match = splitted[i].match(/^(.*?)=(.*)/);
			if (match) {
				name = match[1];
				value = match[2];
			}
			if (name.length === 0)
				continue;
			if (options.decode && typeof value === "string") {
				value = decodeURIComponent(value);
			}
			queries[name] = value;
		}
		return queries;
	}