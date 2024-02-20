function fastHash(str) {
	var hash = 0;
	for (var i = 0, len = str.length; i < len; i++) hash = (((hash << 5) - hash) + str.charCodeAt(i) | 0);
	return hash + 0x7fffffff; // make it positive
}