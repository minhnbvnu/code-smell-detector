function cleanCustomCode(code) {
	// remove trailing spaces, commas, or semi-colons
	return code.replace(/[\s,;]+$/g, '');
}