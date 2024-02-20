function stringify_queries(queries, encode) {
		var queriesstr = [];
		for (var query in queries) {
			if (query.length === 0)
				continue;
			var current_query = query;
			var queryval = queries[query];
			if (encode)
				queryval = encodeURIComponent(queryval);
			if (queries[query] !== true) {
				current_query += "=" + queryval;
			}
			queriesstr.push(current_query);
		}
		return queriesstr.join("&");
	}