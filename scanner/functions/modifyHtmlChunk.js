async function modifyHtmlChunk(content, patterns, request) {
	// Fully tokenizing and parsing the HTML is expensive.  This regex is much faster and should be reasonably safe.
	// It looks for the search patterns and extracts the URL as match #1.  It shouldn't match
	// in-text content because the < > brackets would be escaped in the HTML.  There is some potential risk of
	// matching it in an inline script (unlikely but possible).
	const pageUrl = new URL(request.url);
	for (let pattern of patterns) {
		let match = pattern.exec(content);
		while (match !== null) {
			const originalUrl = match[1];
			let fetchUrl = originalUrl;
			if (fetchUrl.startsWith('//')) {
				fetchUrl = pageUrl.protocol + fetchUrl;
			}
			const proxyUrl = await hashContent(originalUrl, fetchUrl, request);
			if (proxyUrl) {
				content = content.split(originalUrl).join(proxyUrl);
				pattern.lastIndex -= originalUrl.length - proxyUrl.length;
			}
			match = pattern.exec(content);
		}
	}
	return content;
}