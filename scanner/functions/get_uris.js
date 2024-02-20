function get_uris(text) {
	// parse text/uri-list
	// get lines, discarding comments
	const lines = text.split(/[\n\r]+/).filter(line => line[0] !== "#" && line);
	// discard text with too many lines (likely pasted HTML or something) - may want to revisit this
	if (lines.length > 15) {
		return [];
	}
	// parse URLs, discarding anything that parses as a relative URL
	const uris = [];
	for (let i=0; i<lines.length; i++) {
		// Relative URLs will throw when no base URL is passed to the URL constructor.
		try {
			const url = new URL(lines[i]);
			uris.push(url.href);
		// eslint-disable-next-line no-empty
		} catch(e) {}
	}
	return uris;
}