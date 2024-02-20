function processPnpApiOption(option) {
	if (
		option === undefined &&
		/** @type {NodeJS.ProcessVersions & {pnp: string}} */ versions.pnp
	) {
		// @ts-ignore
		return require("pnpapi"); // eslint-disable-line node/no-missing-require
	}

	return option || null;
}