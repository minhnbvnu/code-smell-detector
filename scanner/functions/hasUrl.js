function hasUrl(urls, requestedUrl) {
	// urls comes from sites[vertical].urls, all requestedUrls (may not include trailing slash)

	// TODO lowercase just the origins
	let lowercaseUrls = urls.map(url => url.toLowerCase());

	if(requestedUrl && typeof requestedUrl === "string") {
		// TODO lowercase just the origins
		requestedUrl = requestedUrl.toLowerCase();
		if(lowercaseUrls.indexOf(requestedUrl) > -1 || requestedUrl.endsWith("/") && lowercaseUrls.indexOf(requestedUrl.substr(0, requestedUrl.length - 1)) > -1) {
			return true;
		}
	}

	return false;
}