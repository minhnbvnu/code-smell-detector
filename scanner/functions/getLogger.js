function getLogger(name) {
	if (!name) {
		const d = state1.loggers.get('default');
		assert(d != null, `"default" logger must be set for getting logger without name`);
		return d;
	}
	const result = state1.loggers.get(name);
	if (!result) {
		const logger = new Logger(name, 'NOTSET', {
			handlers: [],
		});
		state1.loggers.set(name, logger);
		return logger;
	}
	return result;
}