function md5(bytes) {
	return createHash('md5').update(bytes).toString('hex');
}