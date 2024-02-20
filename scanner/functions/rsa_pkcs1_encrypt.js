function rsa_pkcs1_encrypt(bytes, n, e, m) {
	const p = concat([0, 2], random_bytes(bytes - m.length - 3), [0], m);
	const msg = os2ip(p);
	const c = rsaep(n, e, msg);
	return i2osp(c, bytes);
}