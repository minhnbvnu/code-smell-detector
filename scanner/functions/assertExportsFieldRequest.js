function assertExportsFieldRequest(request) {
	if (request.charCodeAt(0) !== dotCode) {
		throw new Error('Request should be relative path and start with "."');
	}
	if (request.length === 1) return "";
	if (request.charCodeAt(1) !== slashCode) {
		throw new Error('Request should be relative path and start with "./"');
	}
	if (request.charCodeAt(request.length - 1) === slashCode) {
		throw new Error("Only requesting file allowed");
	}

	return request.slice(2);
}