function xor1(a, b) {
	const c = new Uint8Array(a.length);
	for (let i = 0; i < c.length; i++) {
		c[i] = a[i] ^ b[i % b.length];
	}
	return c;
}