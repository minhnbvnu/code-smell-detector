function calculateDSAPublic(g, p, x) {
	assert.buffer(g);
	assert.buffer(p);
	assert.buffer(x);
	try {
		var bigInt = __webpack_require__(81).BigInteger;
	} catch (e) {
		throw (new Error('To load a PKCS#8 format DSA private key, ' +
		    'the node jsbn library is required.'));
	}
	g = new bigInt(g);
	p = new bigInt(p);
	x = new bigInt(x);
	var y = g.modPow(x, p);
	var ybuf = bigintToMpBuf(y);
	return (ybuf);
}