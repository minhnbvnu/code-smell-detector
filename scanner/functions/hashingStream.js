function hashingStream({encoding = 'hex', algorithm = 'sha512'} = {}) {
	if (encoding === 'buffer') {
		encoding = undefined;
	}

	const stream = crypto.createHash(algorithm);
	stream.setEncoding(encoding);
	return stream;
}