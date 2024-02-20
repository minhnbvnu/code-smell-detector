async function proxyUrl(url, request) {
	let originUrl = 'https:/' + url.pathname + url.search;
	let hashOffset = originUrl.indexOf('cf_hash=');
	if (hashOffset >= 2) {
		originUrl = originUrl.substring(0, hashOffset - 1);
	}

	// Filter the request headers
	let init = {
		method: request.method,
		headers: {},
	};
	const proxy_headers = ['Accept', 'Accept-Encoding', 'Accept-Language', 'Referer', 'User-Agent'];
	for (let name of proxy_headers) {
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

	// Filter the response headers
	const response = await fetch(originUrl, init);
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
		// Extend the cache time for successful responses (since the url is
		// specific to the hashed content).
		if (response.status === 200) {
			responseInit.headers['Cache-Control'] = 'private; max-age=315360000';
		}

		const newResponse = new Response(response.body, responseInit);
		return newResponse;
	}

	return response;
}