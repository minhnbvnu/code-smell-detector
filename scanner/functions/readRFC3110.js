function readRFC3110(keyString) {
	var elems = keyString.split(' ');
	//unused var flags = parseInt(elems[3], 10);
	//unused var protocol = parseInt(elems[4], 10);
	var algorithm = parseInt(elems[5], 10);
	if (!supportedAlgosById[algorithm])
		throw (new Error('Unsupported algorithm: ' + algorithm));
	var base64key = elems.slice(6, elems.length).join();
	var keyBuffer = Buffer.from(base64key, 'base64');
	if (supportedAlgosById[algorithm].match(/^RSA-/)) {
		// join the rest of the body into a single base64-blob
		var publicExponentLen = keyBuffer.readUInt8(0);
		if (publicExponentLen != 3 && publicExponentLen != 1)
			throw (new Error('Cannot parse dnssec key: ' +
			    'unsupported exponent length'));

		var publicExponent = keyBuffer.slice(1, publicExponentLen+1);
		publicExponent = utils.mpNormalize(publicExponent);
		var modulus = keyBuffer.slice(1+publicExponentLen);
		modulus = utils.mpNormalize(modulus);
		// now, make the key
		var rsaKey = {
			type: 'rsa',
			parts: []
		};
		rsaKey.parts.push({ name: 'e', data: publicExponent});
		rsaKey.parts.push({ name: 'n', data: modulus});
		return (new Key(rsaKey));
	}
	if (supportedAlgosById[algorithm] === 'ECDSA-P384-SHA384' ||
	    supportedAlgosById[algorithm] === 'ECDSA-P256-SHA256') {
		var curve = 'nistp384';
		var size = 384;
		if (supportedAlgosById[algorithm].match(/^ECDSA-P256-SHA256/)) {
			curve = 'nistp256';
			size = 256;
		}

		var ecdsaKey = {
			type: 'ecdsa',
			curve: curve,
			size: size,
			parts: [
				{name: 'curve', data: Buffer.from(curve) },
				{name: 'Q', data: utils.ecNormalize(keyBuffer) }
			]
		};
		return (new Key(ecdsaKey));
	}
	throw (new Error('Unsupported algorithm: ' +
	    supportedAlgosById[algorithm]));
}