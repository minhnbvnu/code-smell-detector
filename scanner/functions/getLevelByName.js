function getLevelByName(name) {
	switch (name) {
		case 'NOTSET':
			return LogLevels.NOTSET;
		case 'DEBUG':
			return LogLevels.DEBUG;
		case 'INFO':
			return LogLevels.INFO;
		case 'WARNING':
			return LogLevels.WARNING;
		case 'ERROR':
			return LogLevels.ERROR;
		case 'CRITICAL':
			return LogLevels.CRITICAL;
		default:
			throw new Error(`no log level found for "${name}"`);
	}
}