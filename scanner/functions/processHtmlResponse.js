async function processHtmlResponse(response, request, event) {
	// Workers can only decode utf-8. If it is anything else, pass the
	// response through unmodified
	const contentType = response.headers.get('content-type');
	const charsetRegex = /charset\s*=\s*([^\s;]+)/gim;
	const match = charsetRegex.exec(contentType);
	if (match !== null) {
		let charset = match[1].toLowerCase();
		if (!VALID_CHARSETS.includes(charset)) {
			return response;
		}
	}
	// See if the stylesheet should be embedded or proxied.
	// CSP blocks embedded CSS by default so fall back to proxying
	// the stylesheet through the origin.
	//
	// Note: only 'self' and 'unsafe-inline' CSP rules for style-src
	// are recognized. If explicit URLs are used instead then the
	// HTML will not be modified.
	let embedStylesheet = true;
	let csp = response.headers.get('Content-Security-Policy');
	if (csp) {
		// Get the style policy that will be applied to the document
		let ok = false;
		let cspRule = null;
		const styleRegex = /style-src[^;]*/gim;
		let match = styleRegex.exec(csp);
		if (match !== null) {
			cspRule = match[0];
		} else {
			const defaultRegex = /default-src[^;]*/gim;
			let match = defaultRegex.exec(csp);
			if (match !== null) {
				cspRule = match[0];
			}
		}
		if (cspRule !== null) {
			if (cspRule.indexOf("'unsafe-inline'") >= 0) {
				ok = true;
				embedStylesheet = true;
			} else if (cspRule.indexOf("'self'") >= 0) {
				ok = true;
				embedStylesheet = false;
			}
		}

		// If CSP is enabled but there are no style rules, just bail
		// (shouldn't work even normally but no reason to touch it).
		if (!ok) {
			return response;
		}
	}

	// Create an identity TransformStream (a.k.a. a pipe).
	// The readable side will become our new response body.
	const { readable, writable } = new TransformStream();

	// Create a cloned response with our modified stream
	const newResponse = new Response(readable, response);

	// Start the async processing of the response stream
	modifyHtmlStream(response.body, writable, request, event, embedStylesheet);

	// Return the in-process response so it can be streamed.
	return newResponse;
}