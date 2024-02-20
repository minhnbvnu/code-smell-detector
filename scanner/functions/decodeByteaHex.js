function decodeByteaHex(byteaStr) {
	const bytesStr = byteaStr.slice(2);
	const bytes = new Uint8Array(bytesStr.length / 2);
	for (let i = 0, j = 0; i < bytesStr.length; i += 2, j++) {
		bytes[j] = parseInt(bytesStr[i] + bytesStr[i + 1], HEX);
	}
	return bytes;
}