function generateNonce(size) {
	return mod.encode(crypto.getRandomValues(new Uint8Array(size)));
}