async function deriveKeys(password, salt, iterCount) {
	const ikm = bytes(normalize(password));
	const key = await pbkdf2(msg => sign(msg, ikm), salt, iterCount, 1);
	const server = await sign(bytes('Server Key'), key);
	const client = await sign(bytes('Client Key'), key);
	const stored = new Uint8Array(await crypto.subtle.digest('SHA-256', client));
	return {
		server,
		client,
		stored,
	};
}