function encryptWithKey(packet) {
	const publicKey = parsePublicKey(packet);
	const len = password.length;
	let passwordBuffer = new Uint8Array(len + 1);
	for (let n = 0; n < len; n++) {
		passwordBuffer[n] = password.charCodeAt(n);
	}
	passwordBuffer[len] = 0;
	const encryptedPassword = encrypt(passwordBuffer, scramble, publicKey);
	return {
		done: false,
		next: terminate,
		data: encryptedPassword,
	};
}