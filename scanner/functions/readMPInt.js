function readMPInt(der, nm) {
	assert.strictEqual(der.peek(), asn1.Ber.Integer,
	    nm + ' is not an Integer');
	return (utils.mpNormalize(der.readString(asn1.Ber.Integer, true)));
}