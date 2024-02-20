function readPkcs1ECDSAPrivate(der) {
	var version = readMPInt(der, 'version');
	assert.strictEqual(version.readUInt8(0), 1);

	// private key
	var d = der.readString(asn1.Ber.OctetString, true);

	der.readSequence(0xa0);
	var curve = readECDSACurve(der);
	assert.string(curve, 'a known elliptic curve');

	der.readSequence(0xa1);
	var Q = der.readString(asn1.Ber.BitString, true);
	Q = utils.ecNormalize(Q);

	var key = {
		type: 'ecdsa',
		parts: [
			{ name: 'curve', data: Buffer.from(curve) },
			{ name: 'Q', data: Q },
			{ name: 'd', data: d }
		]
	};

	return (new PrivateKey(key));
}