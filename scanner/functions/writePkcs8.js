function writePkcs8(der, key) {
	der.startSequence();

	if (PrivateKey.isPrivateKey(key)) {
		var sillyInt = Buffer.from([0]);
		der.writeBuffer(sillyInt, asn1.Ber.Integer);
	}

	der.startSequence();
	switch (key.type) {
	case 'rsa':
		der.writeOID('1.2.840.113549.1.1.1');
		if (PrivateKey.isPrivateKey(key))
			writePkcs8RSAPrivate(key, der);
		else
			writePkcs8RSAPublic(key, der);
		break;
	case 'dsa':
		der.writeOID('1.2.840.10040.4.1');
		if (PrivateKey.isPrivateKey(key))
			writePkcs8DSAPrivate(key, der);
		else
			writePkcs8DSAPublic(key, der);
		break;
	case 'ecdsa':
		der.writeOID('1.2.840.10045.2.1');
		if (PrivateKey.isPrivateKey(key))
			writePkcs8ECDSAPrivate(key, der);
		else
			writePkcs8ECDSAPublic(key, der);
		break;
	case 'ed25519':
		der.writeOID('1.3.101.112');
		if (PrivateKey.isPrivateKey(key))
			throw (new Error('Ed25519 private keys in pkcs8 ' +
			    'format are not supported'));
		writePkcs8EdDSAPublic(key, der);
		break;
	default:
		throw (new Error('Unsupported key type: ' + key.type));
	}

	der.endSequence();
}