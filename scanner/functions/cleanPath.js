function cleanPath(path) {
	// remove bad chars & leading or trailing /
	return path.replace(/^\/|\/$|[\\:*?"<>|#]+/g, '');
}