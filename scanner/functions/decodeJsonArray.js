function decodeJsonArray(value) {
	return parseArray(value, JSON.parse);
}