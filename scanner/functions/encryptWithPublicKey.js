function encryptWithPublicKey(key, data) {
	const publicKey = RSA.parseKey(key);
	return RSA.encrypt(data, publicKey);
}