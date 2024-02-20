function getCacheKey(userAgent) {
	let os = '';
	const osRegex = /^[^(]*\(\s*(\w+)/gim;
	let match = osRegex.exec(userAgent);
	if (match) {
		os = match[1];
	}

	let mobile = '';
	if (userAgent.match(/Mobile/gim)) {
		mobile = 'Mobile';
	}

	// Detect Edge first since it includes Chrome and Safari
	const edgeRegex = /\s+Edge\/(\d+)/gim;
	match = edgeRegex.exec(userAgent);
	if (match) {
		return 'Edge' + match[1] + os + mobile;
	}

	// Detect Chrome next (and browsers using the Chrome UA/engine)
	const chromeRegex = /\s+Chrome\/(\d+)/gim;
	match = chromeRegex.exec(userAgent);
	if (match) {
		return 'Chrome' + match[1] + os + mobile;
	}

	// Detect Safari and Webview next
	const webkitRegex = /\s+AppleWebKit\/(\d+)/gim;
	match = webkitRegex.exec(userAgent);
	if (match) {
		return 'WebKit' + match[1] + os + mobile;
	}

	// Detect Firefox
	const firefoxRegex = /\s+Firefox\/(\d+)/gim;
	match = firefoxRegex.exec(userAgent);
	if (match) {
		return 'Firefox' + match[1] + os + mobile;
	}

	return null;
}