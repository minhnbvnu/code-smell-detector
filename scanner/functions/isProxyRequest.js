function isProxyRequest(url) {
	let found_prefix = false;
	const path = url.pathname + url.search;
	for (let prefix of SCRIPT_URLS) {
		if (path.startsWith(prefix) && path.indexOf('cf_hash=') >= 0) {
			found_prefix = true;
			break;
		}
	}
	return found_prefix;
}