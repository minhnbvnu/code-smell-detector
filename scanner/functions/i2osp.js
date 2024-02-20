function i2osp(x, length) {
	const t = new Uint8Array(length);
	for (let i = length - 1; i >= 0; i--) {
		if (x === 0n) break;
		t[i] = Number(x & 255n);
		x = x >> 8n;
	}
	return t;
}