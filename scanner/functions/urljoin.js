function urljoin(a, b, browser) {
		if (b.length === 0)
			return a;
		if (b.match(/^[-a-z]*:\/\//) || b.match(/^(?:data|x-raw-image|blob|about|javascript):/))
			return b;
		var protocol_split = a.split("://");
		// FIXME? for URLs like about:blank
		if (protocol_split.length < 2) {
			return a;
		}
		var protocol = protocol_split[0];
		var splitted = protocol_split[1].split("/");
		var domain = splitted[0];
		var start = protocol + "://" + domain;
		if (!browser) {
			// simple path join
			// urljoin("http://site.com/index.html", "file.png") = "http://site.com/index.html/file.png"
			return a.replace(/\/*$/, "") + "/" + b.replace(/^\/*/, "");
		} else {
			if (b.length >= 2 && b.slice(0, 2) === "//")
				return protocol + ":" + b;
			if (b.length >= 1 && b.slice(0, 1) === "/")
				return start + b;
			if (b.length >= 2 && b.slice(0, 2) === "./")
				b = b.substring(2);
			// to emulate the browser's behavior instead
			// urljoin("http://site.com/index.html", "file.png") = "http://site.com/file.png"
			if (!a.match(/\/$/))
				a = a.replace(/^([^?]*)\/.*?$/, "$1/");
			return urlnorm(a + b.replace(/^\/*/, ""));
			//return a.replace(/\/[^/]*$/, "/") + b.replace(/^\/*/, "");
			//return urlnorm(a.replace(/^([^?]*)\/.*?$/, "$1/") + b.replace(/^\/*/, ""));
		}
	}