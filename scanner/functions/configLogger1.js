async function configLogger1(config) {
	let { enable = true, level = 'INFO' } = config;
	if (config.logger) level = config.logger.levelName;
	isDebug = level == 'DEBUG';
	if (!enable) {
		logger = new mod.Logger('fakeLogger', 'NOTSET', {});
		logger.level = 100;
	} else {
		if (!config.logger) {
			await mod.setup({
				handlers: {
					console: new mod.handlers.ConsoleHandler(level),
				},
				loggers: {
					default: {
						level: 'DEBUG',
						handlers: ['console'],
					},
				},
			});
			logger = mod.getLogger();
		} else {
			logger = config.logger;
		}
	}
}