function decodeBytea(byteaStr) {
	if (HEX_PREFIX_REGEX.test(byteaStr)) {
		return decodeByteaHex(byteaStr);
	} else {
		return decodeByteaEscape(byteaStr);
	}
}