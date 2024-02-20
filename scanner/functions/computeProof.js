function computeProof(signature, key) {
	const proof = new Uint8Array(signature.length);
	for (let i = 0; i < proof.length; i++) {
		proof[i] = signature[i] ^ key[i];
	}
	return proof;
}