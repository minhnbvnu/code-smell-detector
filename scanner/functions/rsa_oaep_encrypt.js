function rsa_oaep_encrypt(bytes, n, e, m, algorithm) {
	const em = eme_oaep_encode(new Uint8Array(0), m, bytes, algorithm);
	const msg = os2ip(em);
	const c = rsaep(n, e, msg);
	return i2osp(c, bytes);
}