function createParams(params = {}) {
	if (typeof params === 'string') {
		params = parseOptionsFromDsn(params);
	}
	let pgEnv = {};
	let has_env_access = true;
	try {
		pgEnv = getPgEnv();
	} catch (e) {
		if (e instanceof Deno.errors.PermissionDenied) {
			has_env_access = false;
		} else {
			throw e;
		}
	}
	let port;
	if (params.port) {
		port = Number(params.port);
	} else if (pgEnv.port) {
		port = Number(pgEnv.port);
	} else {
		port = DEFAULT_OPTIONS.port;
	}
	if (Number.isNaN(port) || port === 0) {
		throw new ConnectionParamsError(`"${params.port ?? pgEnv.port}" is not a valid port number`);
	}
	const tls_enabled = !!(params?.tls?.enabled ?? DEFAULT_OPTIONS.tls.enabled);
	const tls_enforced = !!(params?.tls?.enforce ?? DEFAULT_OPTIONS.tls.enforce);
	if (!tls_enabled && tls_enforced) {
		throw new ConnectionParamsError("Can't enforce TLS when client has TLS encryption is disabled");
	}
	const connection_options = {
		applicationName:
			params.applicationName ?? pgEnv.applicationName ?? DEFAULT_OPTIONS.applicationName,
		connection: {
			attempts: params?.connection?.attempts ?? DEFAULT_OPTIONS.connection.attempts,
		},
		database: params.database ?? pgEnv.database,
		hostname: params.hostname ?? pgEnv.hostname ?? DEFAULT_OPTIONS.hostname,
		password: params.password ?? pgEnv.password,
		port,
		tls: {
			enabled: tls_enabled,
			enforce: tls_enforced,
			caFile: params?.tls?.caFile,
		},
		user: params.user ?? pgEnv.user,
	};
	assertRequiredOptions(
		connection_options,
		['applicationName', 'database', 'hostname', 'port', 'user'],
		has_env_access
	);
	return connection_options;
}