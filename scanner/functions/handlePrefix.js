function handlePrefix(prefix) {
	return request => {
		// compute the default (e.g. / -> index.html)
		let defaultAssetKey = mapRequestToAsset(request);
		let url = new URL(defaultAssetKey.url);

		// strip the prefix from the path for lookup
		url.pathname = url.pathname.replace(prefix, '/');

		// inherit all other props from the default request
		return new Request(url.toString(), defaultAssetKey);
	};
}