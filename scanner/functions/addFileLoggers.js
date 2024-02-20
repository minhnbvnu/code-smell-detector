function addFileLoggers(options, emitter) {
    // Attach listeners for logging
    // Ensure logs dir.
    var logdir = false;
    try {
        fs.readdirSync(process.cwd() + '/logs');
        logdir = true;
    }
    catch(e) {
        try {
            fs.mkdirSync(process.cwd() + '/logs/', parseInt('755', 8));
            logdir = true;
        }
        catch(e) {
        }
    }
    var logger = createLogger(logdir, '/logs/ql.io.log');
    var accessLogger = createLogger(logdir, '/logs/access.log');
    var errLogger = createLogger(logdir, '/logs/error.log');
    var proxyLogger = createLogger(logdir, '/logs/proxy.log');

    logger.setLevels(winston.config.cli.levels);
    emitter.on('ql.io-begin-event', function (event, message) {
        if(_.isObject(message)) {
            message.eventId = event.eventId;
            message.pid = process.pid;
        }
        if(event.type === 'URL') {
            accessLogger.info(message)
        }
        else if(event.name === 'http-request') {
            proxyLogger.info(message)
        }
    });
    emitter.on('ql.io-end-event', function (event, message) {
        if(_.isObject(message)) {
            message.eventId = event.eventId;
            message.pid = process.pid;
            message.duration = event.duration;
        }
        if(event.type === 'URL') {
            accessLogger.info(message)
        }
        else if(event.name === 'http-request') {
            proxyLogger.info(message)
        }
    });

    emitter.on('ql.io-event', function (event, message) {
        logger.info(message || event);
    });

    emitter.on('info', function (event, message) {
        logger.info(message || event);
    });

    emitter.on('ql.io-error', function (event, message, err) {
        errLogger.info(message || event);
        if(err) {
            errLogger.error(err.stack || err);
        }
    });
    emitter.on('error', function (event, message) {
        errLogger.error(message || event);
    });

    emitter.on('fatal', function (event, message) {
        errLogger.error(message || event);
    });

    emitter.on('ql.io-warning', function (event, message) {
        var warn = errLogger.warn || errLogger.warning;
        warn(message || event);
    });
    emitter.on('warning', function (message) {
        var warn = errLogger.warn || errLogger.warning;
        warn(message);
    });
}