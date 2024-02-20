function parseDsn(dsn) {
	const [protocol, strippedUrl] = dsn.match(/(?:(?!:\/\/).)+/g) ?? ['', ''];
	const url = new URL(`http:${strippedUrl}`);
	let password = url.password;
	try {
		password = decodeURIComponent(password);
	} catch (_e) {
		console.error(bold(yellow('Failed to decode URL password') + '\nDefaulting to raw password'));
	}
	return {
		password,
		driver: protocol,
		user: url.username,
		hostname: url.hostname,
		port: url.port,
		database: url.pathname.slice(1),
		params: Object.fromEntries(url.searchParams.entries()),
	};
}