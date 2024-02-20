function urlsplit(a) {
		var protocol_split = a.split("://");
		var protocol = protocol_split[0];
		var splitted = protocol_split[1].split("/");
		var domain = splitted[0];
		var start = protocol + "://" + domain;
		return {
			protocol: protocol,
			domain: domain,
			url: a
		};
	}