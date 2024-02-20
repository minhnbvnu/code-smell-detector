function eme_oaep_decode(label, c, k, algorithm) {
	const labelHash = new Uint8Array(createHash1(algorithm).update(label).digest());
	const maskedSeed = c.slice(1, 1 + labelHash.length);
	const maskedDb = c.slice(1 + labelHash.length);
	const seedMask = mgf1(maskedDb, labelHash.length, algorithm);
	const seed = xor1(maskedSeed, seedMask);
	const dbMask = mgf1(seed, k - labelHash.length - 1, algorithm);
	const db = xor1(maskedDb, dbMask);
	let ptr = labelHash.length;
	while (ptr < db.length && db[ptr] === 0) ptr++;
	return db.slice(ptr + 1);
}