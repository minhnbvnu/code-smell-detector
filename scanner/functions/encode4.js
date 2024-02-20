function encode4(src) {
	const dst = new Uint8Array(src.length * 2);
	for (let i = 0; i < dst.length; i++) {
		const v = src[i];
		dst[i * 2] = hexTable1[v >> 4];
		dst[i * 2 + 1] = hexTable1[v & 15];
	}
	return dst;
}