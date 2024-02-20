function decode_entities(str) {
		var match = str.match(/^\s*<!\[CDATA\[([\s\S]+)\]\]>\s*$/);
		if (match)
			return match[1];
		return str
			.replace(/&nbsp;/g, " ")
			.replace(/&#([0-9]+);/g, function(full, num) { return string_fromcharcode(num); })
			.replace(/&quot;/g, '"')
			.replace(/&amp;/g, "&");
	}