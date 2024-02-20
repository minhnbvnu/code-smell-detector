function add_queries(url, queries) {
		var parsed_queries = get_queries(url);
		for (var query in queries) {
			parsed_queries[query] = queries[query];
		}
		var newquerystring = stringify_queries(parsed_queries);
		if (newquerystring) {
			return url.replace(/^([^#]*?)(?:\?.*)?$/, "$1?" + newquerystring);
		} else {
			return url;
		}
	}