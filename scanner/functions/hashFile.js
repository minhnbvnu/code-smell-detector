async function hashFile(filePath, options = {}) {
	if (Worker === undefined) {
		return hash(fs.createReadStream(filePath), options);
	}

	const {
		encoding = 'hex',
		algorithm = 'sha512',
	} = options;

	const hash = await taskWorker('hashFile', [algorithm, filePath]);

	if (encoding === 'buffer') {
		return Buffer.from(hash);
	}

	return Buffer.from(hash).toString(encoding);
}