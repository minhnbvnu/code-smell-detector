function decodeIntArray(value) {
	if (!value) return null;
	return parseArray(value, decodeInt);
}