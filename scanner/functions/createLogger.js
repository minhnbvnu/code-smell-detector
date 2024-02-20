function createLogger(logdir, name) {
    var logger = logdir ? new (winston.Logger)({
        transports: [
            new (winston.transports.File)({
                filename: process.cwd() + name,
                maxsize: 1024000 * 5,
                colorize: false,
                json: true,
                timestamp: function () {
                    return new Date();
                }
            })
        ]
    }) : new (winston.Logger)();
    return logger;
}