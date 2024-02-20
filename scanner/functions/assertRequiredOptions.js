function assertRequiredOptions(options, requiredKeys, has_env_access) {
	const missingParams = [];
	for (const key of requiredKeys) {
		if (options[key] === '' || options[key] === null || options[key] === undefined) {
			missingParams.push(key);
		}
	}
	if (missingParams.length) {
		let missing_params_message = formatMissingParams(missingParams);
		if (!has_env_access) {
			missing_params_message +=
				'\nConnection parameters can be read from environment variables only if Deno is run with env permission';
		}
		throw new ConnectionParamsError(missing_params_message);
	}
}