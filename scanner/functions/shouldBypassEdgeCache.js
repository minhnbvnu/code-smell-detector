function shouldBypassEdgeCache(request, response) {
	let bypassCache = false;

	if (request && response) {
		const options = getResponseOptions(response);
		const cookieHeader = request.headers.get('cookie');
		let bypassCookies = DEFAULT_BYPASS_COOKIES;
		if (options) {
			bypassCookies = options.bypassCookies;
		}
		if (cookieHeader && cookieHeader.length && bypassCookies.length) {
			const cookies = cookieHeader.split(';');
			for (let cookie of cookies) {
				// See if the cookie starts with any of the logged-in user prefixes
				for (let prefix of bypassCookies) {
					if (cookie.trim().startsWith(prefix)) {
						bypassCache = true;
						break;
					}
				}
				if (bypassCache) {
					break;
				}
			}
		}
	}

	return bypassCache;
}