function getCreateFn(server) {
    /**
     * Create a new CasperJS instance
     */
    return function create (options) {
        options = options || {};

        for (var k in options) {
            if (k.indexOf('on') === 0) {
                options[k] = createFunction(options[k]);
            }
        }

        if (options.httpStatusHandlers) {
            for (k in options.httpStatusHandlers) {
                options.httpStatusHandlers[k] =
                    createFunction(options.httpStatusHandlers[k]);
            }
        }

        server._instance = instance = casper.create(options);
        instance.emit = function () {
            var args = Array.prototype.slice.apply(arguments);
            if (args[0] === 'starting' && server.stop) {
                server.stop();
            } else if (args[0] === 'run.complete' && server.start) {
                server.start();
            }

            try {
                emit.apply(this, arguments);
            } catch (e) {
                emit.call(this, 'log', e.message, args[1].location);
            }
            this.constructor.prototype.emit.apply(this, args.slice());
        };

        return {
            methods: server.provides()
        };
    };
}