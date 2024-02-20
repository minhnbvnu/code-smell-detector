function addRSAMissing(key) {
	assert.object(key);
	assertCompatible(key, PrivateKey, [1, 1]);
	try {
		var bigInt = __webpack_require__(81).BigInteger;
	} catch (e) {
		throw (new Error('To write a PEM private key from ' +
		    'this source, the node jsbn lib is required.'));
	}

	var d = new bigInt(key.part.d.data);
	var buf;

	if (!key.part.dmodp) {
		var p = new bigInt(key.part.p.data);
		var dmodp = d.mod(p.subtract(1));

		buf = bigintToMpBuf(dmodp);
		key.part.dmodp = {name: 'dmodp', data: buf};
		key.parts.push(key.part.dmodp);
	}
	if (!key.part.dmodq) {
		var q = new bigInt(key.part.q.data);
		var dmodq = d.mod(q.subtract(1));

		buf = bigintToMpBuf(dmodq);
		key.part.dmodq = {name: 'dmodq', data: buf};
		key.parts.push(key.part.dmodq);
	}
}