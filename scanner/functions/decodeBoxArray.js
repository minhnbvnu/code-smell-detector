function decodeBoxArray(value) {
	return parseArray(value, decodeBox, ';');
}