function segmentize(url) {
	return url.replace(/(^\/+|\/+$)/g, '').split('/');
}