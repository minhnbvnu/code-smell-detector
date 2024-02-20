function str2bytes(str) {
	const encoder = new TextEncoder();
	return encoder.encode(str);
}