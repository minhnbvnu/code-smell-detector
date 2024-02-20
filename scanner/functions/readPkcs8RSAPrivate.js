function readPkcs8RSAPrivate(der) {
	der.readSequence(asn1.Ber.OctetString);
	der.readSequence();

	var ver = readMPInt(der, 'version');
	assert.equal(ver[0], 0x0, 'unknown RSA private key version');

	// modulus then public exponent
	var n = readMPInt(der, 'modulus');
	var e = readMPInt(der, 'public exponent');
	var d = readMPInt(der, 'private exponent');
	var p = readMPInt(der, 'prime1');
	var q = readMPInt(der, 'prime2');
	var dmodp = readMPInt(der, 'exponent1');
	var dmodq = readMPInt(der, 'exponent2');
	var iqmp = readMPInt(der, 'iqmp');

	// now, make the key
	var key = {
		type: 'rsa',
		parts: [
			{ name: 'n', data: n },
			{ name: 'e', data: e },
			{ name: 'd', data: d },
			{ name: 'iqmp', data: iqmp },
			{ name: 'p', data: p },
			{ name: 'q', data: q },
			{ name: 'dmodp', data: dmodp },
			{ name: 'dmodq', data: dmodq }
		]
	};

	return (new PrivateKey(key));
}