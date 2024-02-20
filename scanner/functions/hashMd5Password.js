function hashMd5Password(password, username, salt) {
	const innerHash = md5(encoder.encode(password + username));
	const innerBytes = encoder.encode(innerHash);
	const outerBuffer = new Uint8Array(innerBytes.length + salt.length);
	outerBuffer.set(innerBytes);
	outerBuffer.set(salt, innerBytes.length);
	const outerHash = md5(outerBuffer);
	return 'md5' + outerHash;
}