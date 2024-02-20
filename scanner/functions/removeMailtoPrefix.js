function removeMailtoPrefix(uri) {
	if (typeof uri !== 'string') {
		return ''
	}

	if (uri.startsWith('mailto:')) {
		return uri.slice(7)
	}

	return uri
}