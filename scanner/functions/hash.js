function hash(algorithm, data) {
	return new Uint8Array(createHash(algorithm).update(data).digest());
}