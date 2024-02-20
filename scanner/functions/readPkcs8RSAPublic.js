function readPkcs8RSAPublic(der) {
	// bit string sequence
	der.readSequence(asn1.Ber.BitString);
	der.readByte();
	der.readSequence();

	// modulus
	var n = readMPInt(der, 'modulus');
	var e = readMPInt(der, 'exponent');

	// now, make the key
	var key = {
		type: 'rsa',
		source: der.originalInput,
		parts: [
			{ name: 'e', data: e },
			{ name: 'n', data: n }
		]
	};

	return (new Key(key));
}