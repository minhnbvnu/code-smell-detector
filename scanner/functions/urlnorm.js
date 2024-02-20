function urlnorm(a) {
		var protocol_split = a.split("://");
		var splitted = protocol_split[1].split("/");
		var newsplitted = [];
		for (var i = 0; i < splitted.length; i++) {
			if (splitted[i] === "..")
				newsplitted.pop();
			else
				newsplitted.push(splitted[i]);
		}
		return protocol_split[0] + "://" + newsplitted.join("/");
	}