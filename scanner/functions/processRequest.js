async function processRequest(request, event) {
	const response = await fetch(request);
	if (response && response.status === 200) {
		const contentType = response.headers.get('content-type');
		if (contentType && contentType.indexOf('text/html') !== -1) {
			return await processHtmlResponse(response, event.request, event);
		} else if (contentType && contentType.indexOf('text/css') !== -1) {
			return await processStylesheetResponse(response, event.request, event);
		}
	}

	return response;
}