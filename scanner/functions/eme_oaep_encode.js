function eme_oaep_encode(label, m, k, algorithm) {
	const labelHash = new Uint8Array(createHash1(algorithm).update(label).digest());
	const ps = new Uint8Array(k - labelHash.length * 2 - 2 - m.length);
	const db = concat(labelHash, ps, [1], m);
	const seed = random_bytes(labelHash.length);
	const dbMask = mgf1(seed, k - labelHash.length - 1, algorithm);
	const maskedDb = xor1(db, dbMask);
	const seedMask = mgf1(maskedDb, labelHash.length, algorithm);
	const maskedSeed = xor1(seed, seedMask);
	return concat([0], maskedSeed, maskedDb);
}