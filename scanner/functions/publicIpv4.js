function publicIpv4(options) {
	options = {
		...defaults,
		...options,
	};

	if (!options.onlyHttps) {
		return queryAll('v4', options);
	}

	if (options.onlyHttps) {
		return queryHttps('v4', options);
	}

	return queryDns('v4', options);
}