function addMailtoPrefix(uri) {
	if (typeof uri !== 'string') {
		return 'mailto:'
	}

	if (uri.startsWith('mailto:')) {
		return uri
	}

	return `mailto:${uri}`
}