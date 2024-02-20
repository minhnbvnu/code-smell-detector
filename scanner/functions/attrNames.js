function attrNames(elem) {
		var names = [];
		var html = outerHtml(elem.cloneNode(false));
		var match;
		while (null != (match = attrRegex.exec(html))) {
			names.push(match[1]);
		}
		return names;
	}