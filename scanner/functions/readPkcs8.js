function readPkcs8(alg, type, der) {
	/* Private keys in pkcs#8 format have a weird extra int */
	if (der.peek() === asn1.Ber.Integer) {
		assert.strictEqual(type, 'private',
		    'unexpected Integer at start of public key');
		der.readString(asn1.Ber.Integer, true);
	}

	der.readSequence();
	var next = der.offset + der.length;

	var oid = der.readOID();
	switch (oid) {
	case '1.2.840.113549.1.1.1':
		der._offset = next;
		if (type === 'public')
			return (readPkcs8RSAPublic(der));
		else
			return (readPkcs8RSAPrivate(der));
	case '1.2.840.10040.4.1':
		if (type === 'public')
			return (readPkcs8DSAPublic(der));
		else
			return (readPkcs8DSAPrivate(der));
	case '1.2.840.10045.2.1':
		if (type === 'public')
			return (readPkcs8ECDSAPublic(der));
		else
			return (readPkcs8ECDSAPrivate(der));
	case '1.3.101.112':
		if (type === 'public') {
			return (readPkcs8EdDSAPublic(der));
		} else {
			return (readPkcs8EdDSAPrivate(der));
		}
	case '1.3.101.110':
		if (type === 'public') {
			return (readPkcs8X25519Public(der));
		} else {
			return (readPkcs8X25519Private(der));
		}
	default:
		throw (new Error('Unknown key type OID ' + oid));
	}
}