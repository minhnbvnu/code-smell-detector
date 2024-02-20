function Signer(key, hashAlgo) {
	if (nacl === undefined)
		nacl = __webpack_require__(76);

	if (hashAlgo.toLowerCase() !== 'sha512')
		throw (new Error('ED25519 only supports the use of ' +
		    'SHA-512 hashes'));

	this.key = key;
	this.chunks = [];

	stream.Writable.call(this, {});
}