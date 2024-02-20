async function processHtmlRequest(request) {
	// Fetch from origin server.
	const response = await fetch(request);
	let contentType = response.headers.get('content-type');
	if (contentType && contentType.indexOf('text/html') !== -1) {
		// Workers can only decode utf-8. If it is anything else, pass the
		// response through unmodified
		const charsetRegex = /charset\s*=\s*([^\s;]+)/gim;
		const match = charsetRegex.exec(contentType);
		if (match !== null) {
			let charset = match[1].toLowerCase();
			if (!VALID_CHARSETS.includes(charset)) {
				return response;
			}
		}

		// Create an identity TransformStream (a.k.a. a pipe).
		// The readable side will become our new response body.
		const { readable, writable } = new TransformStream();

		// Create a cloned response with our modified stream and content type header
		const newResponse = new Response(readable, response);

		// Start the async processing of the response stream (don't wait for it to finish)
		modifyHtmlStream(response.body, writable, request);

		// Return the in-process response so it can be streamed.
		return newResponse;
	} else {
		return response;
	}
}