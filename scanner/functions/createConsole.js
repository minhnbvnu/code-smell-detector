function createConsole(options, cluster, cb) {
    var disableConsole = Boolean(program.disableConsole);
    var disableQ = Boolean(program.disableQ);
    return new Console({
        loggerFn: function(emitter) {
            // Add loggers
            options.loggerFn.call(null, options, emitter);

            // Listen to cluster events
            cluster.on('died', function(pid) {
                emitter.emit('fatal', {
                    pid: pid,
                    message: 'Process died'
                });
            });
            cluster.on('forked', function(pid) {
                emitter.emit('info', {
                    pid: pid,
                    message: 'Worker forked'
                });
            });
            cluster.on('SIGTERM', function(pid) {
                emitter.emit('info', {
                    signal: 'SIGTERM',
                    pid: pid,
                    message: 'Shutting down'
                });
            });
            cluster.on('warning', function(message) {
                emitter.emit('warning', message);
            })
        },
        'tables': program.tables,
        'routes': program.routes,
        'connectors': program.connectors,
        'config': program.config,
        'xformers': program.xformers,
        'enable console': !disableConsole,
        'enable q': !disableQ,
        'request-id': program.requestId,
        'log levels': require('winston').config.syslog.levels}, cb);
}