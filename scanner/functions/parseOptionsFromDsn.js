function parseOptionsFromDsn(connString) {
	const dsn = parseDsn(connString);
	if (dsn.driver !== 'postgres' && dsn.driver !== 'postgresql') {
		throw new ConnectionParamsError(`Supplied DSN has invalid driver: ${dsn.driver}.`);
	}
	let tls = {
		enabled: true,
		enforce: false,
	};
	if (dsn.params.sslmode) {
		const sslmode = dsn.params.sslmode;
		delete dsn.params.sslmode;
		if (!['disable', 'require', 'prefer'].includes(sslmode)) {
			throw new ConnectionParamsError(
				`Supplied DSN has invalid sslmode '${sslmode}'. Only 'disable', 'require', and 'prefer' are supported`
			);
		}
		if (sslmode === 'require') {
			tls = {
				enabled: true,
				enforce: true,
			};
		}
		if (sslmode === 'disable') {
			tls = {
				enabled: false,
				enforce: false,
			};
		}
	}
	return {
		...dsn,
		applicationName: dsn.params.application_name,
		tls,
	};
}