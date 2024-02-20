async function proxyRequest(url, request) {
	let init = {
		method: request.method,
		headers: {},
	};
	// Only pass through a subset of headers
	const proxyHeaders = ['Accept', 'Accept-Encoding', 'Accept-Language', 'Referer', 'User-Agent'];
	for (let name of proxyHeaders) {
		let value = request.headers.get(name);
		if (value) {
			init.headers[name] = value;
		}
	}
	// Add an X-Forwarded-For with the client IP
	const clientAddr = request.headers.get('cf-connecting-ip');
	if (clientAddr) {
		init.headers['X-Forwarded-For'] = clientAddr;
	}

	const response = await fetch(url, init);
	if (response) {
		const responseHeaders = [
			'Content-Type',
			'Cache-Control',
			'Expires',
			'Accept-Ranges',
			'Date',
			'Last-Modified',
			'ETag',
		];
		// Only include a strict subset of response headers
		let responseInit = {
			status: response.status,
			statusText: response.statusText,
			headers: {},
		};
		for (let name of responseHeaders) {
			let value = response.headers.get(name);
			if (value) {
				responseInit.headers[name] = value;
			}
		}
		// Add some security headers to make sure there isn't scriptable content
		// being proxied.
		responseInit.headers['X-Content-Type-Options'] = 'nosniff';
		const newResponse = new Response(response.body, responseInit);
		return newResponse;
	}

	return response;
}