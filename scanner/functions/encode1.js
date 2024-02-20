function encode1(src) {
	const dst = new Uint8Array(src.length * 2);
	for (let i = 0; i < dst.length; i++) {
		const v = src[i];
		dst[i * 2] = hexTable[v >> 4];
		dst[i * 2 + 1] = hexTable[v & 15];
	}
	return dst;
}