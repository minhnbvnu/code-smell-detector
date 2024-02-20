function calculateX25519Public(k) {
	assert.buffer(k);

	if (nacl === undefined)
		nacl = __webpack_require__(76);

	var kp = nacl.box.keyPair.fromSeed(new Uint8Array(k));
	return (Buffer.from(kp.publicKey));
}