async function proxyStylesheet(url, request) {
	let css = await fetchCSS(url, request);
	if (css) {
		const responseInit = {
			headers: {
				'Content-Type': 'text/css; charset=utf-8',
				'Cache-Control': 'private, max-age=86400, stale-while-revalidate=604800',
			},
		};
		const newResponse = new Response(css, responseInit);
		return newResponse;
	} else {
		// Do a straight-through proxy as fallback
		return proxyRequest(url, request);
	}
}