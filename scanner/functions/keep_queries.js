function keep_queries(url, queries, options) {
		if (!is_array(queries)) {
			queries = [queries];
		}
		if (!options) {
			options = {};
		}
		var url_queries = get_queries(url);
		var kept_queries = [];
		var has_queries = new_set();
		array_foreach(queries, function(query) {
			if (query in url_queries) {
				var querystr = query + "=";
				if (options.overwrite && query in options.overwrite) {
					querystr += options.overwrite[query];
				} else {
					querystr += url_queries[query];
				}
				kept_queries.push(querystr);
				set_add(has_queries, query);
			}
		});
		if (options.required) {
			if (options.required === true)
				options.required = queries;
			var required_total = 0;
			array_foreach(options.required, function(query) {
				if (set_has(has_queries, query)) {
					required_total++;
				} else {
					return false;
				}
			});
			if (required_total < options.required.length)
				return url;
		}
		if (options.overwrite) {
			for (var query in options.overwrite) {
				if (!set_has(has_queries, query)) {
					kept_queries.push(query + "=" + options.overwrite[query]);
				}
			}
		}
		var afterquery;
		if (kept_queries.length === 0)
			afterquery = "";
		else
			afterquery = "?" + kept_queries.join("&");
		return url.replace(/\?.*/, "") + afterquery;
	}