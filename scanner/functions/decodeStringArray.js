function decodeStringArray(value) {
	if (!value) return null;
	return parseArray(value, value => value);
}