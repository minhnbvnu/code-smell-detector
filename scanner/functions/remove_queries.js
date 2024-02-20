function remove_queries(url, queries) {
		if (!is_array(queries)) {
			queries = [queries];
		}
		var beforequery = url.replace(/^([^#]*?)\?(.*)$/, "$1");
		var afterquery = url.replace(/^([^#]*?)\?(.*)$/, "$2");
		// TODO: handle things like: ?a=b&c=b#&d=e
		// no query string
		if (beforequery === url)
			return url;
		var splitted = afterquery.split("&");
		var newsplitted = [];
		for (var i = 0; i < splitted.length; i++) {
			var property = splitted[i].replace(/^(.*?)=.*/, "$1");
			if (array_indexof(queries, property) < 0) {
				newsplitted.push(splitted[i]);
			}
		}
		if (newsplitted.length === 0) {
			afterquery = "";
		} else {
			afterquery = "?" + newsplitted.join("&");
		}
		return beforequery + afterquery;
	}