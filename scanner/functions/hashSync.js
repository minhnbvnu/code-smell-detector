function hashSync(input, {encoding = 'hex', algorithm = 'sha512'} = {}) {
	if (encoding === 'buffer') {
		encoding = undefined;
	}

	const hash = crypto.createHash(algorithm);

	const update = buffer => {
		const inputEncoding = typeof buffer === 'string' ? 'utf8' : undefined;
		hash.update(buffer, inputEncoding);
	};

	for (const element of [input].flat()) {
		update(element);
	}

	return hash.digest(encoding);
}