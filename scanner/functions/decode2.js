function decode2(b64) {
	const binString = atob(b64);
	const size = binString.length;
	const bytes = new Uint8Array(size);
	for (let i = 0; i < size; i++) {
		bytes[i] = binString.charCodeAt(i);
	}
	return bytes;
}