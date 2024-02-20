function rsa_pkcs1_decrypt(bytes, n, d, c) {
	const em = i2osp(rsadp(n, d, os2ip(c)), bytes);
	if (em[0] !== 0) throw 'Decryption error';
	if (em[1] !== 2) throw 'Decryption error';
	let psCursor = 2;
	for (; psCursor < em.length; psCursor++) {
		if (em[psCursor] === 0) break;
	}
	if (psCursor < 10) throw 'Decryption error';
	return em.slice(psCursor + 1);
}