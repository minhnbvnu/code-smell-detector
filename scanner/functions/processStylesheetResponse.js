async function processStylesheetResponse(response, request, event) {
	let body = response.body;
	try {
		body = await response.text();
		const fontCSSRegex =
			/@import\s*(url\s*)?[\('"\s]+((https?:)?\/\/fonts.googleapis.com\/css[^'"\)]+)[\s'"\)]+\s*;/gim;
		let match = fontCSSRegex.exec(body);
		while (match !== null) {
			const matchString = match[0];
			const fontCSS = await fetchCSS(match[2], request, event);
			if (fontCSS.length) {
				body = body.split(matchString).join(fontCSS);
				fontCSSRegex.lastIndex -= matchString.length - fontCSS.length;
			}
			match = fontCSSRegex.exec(body);
		}
	} catch (e) {
		// Ignore the exception, the original body will be passed through.
	}

	// Return a cloned response with the (possibly modified) body.
	// We can't just return the original response since we already
	// consumed the body.
	const newResponse = new Response(body, response);

	return newResponse;
}