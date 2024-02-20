function constructProxyUrl(originalUrl, hash) {
	let proxyUrl = null;
	let pathStart = originalUrl.indexOf('//');
	if (pathStart >= 0) {
		proxyUrl = originalUrl.substring(pathStart + 1);
		if (proxyUrl.indexOf('?') >= 0) {
			proxyUrl += '&';
		} else {
			proxyUrl += '?';
		}
		proxyUrl += 'cf_hash=' + hash;
	}
	return proxyUrl;
}