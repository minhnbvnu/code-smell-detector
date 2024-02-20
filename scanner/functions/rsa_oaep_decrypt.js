function rsa_oaep_decrypt(bytes, n, d, c, algorithm) {
	const em = rsadp(n, d, os2ip(c));
	const m = eme_oaep_decode(new Uint8Array(0), i2osp(em, bytes), bytes, algorithm);
	return m;
}