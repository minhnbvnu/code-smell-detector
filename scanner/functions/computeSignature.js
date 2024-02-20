function computeSignature(message, key) {
	return sign(bytes(message), key);
}