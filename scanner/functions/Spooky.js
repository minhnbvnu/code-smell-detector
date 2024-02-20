function Spooky(options, callback) {
    EventEmitter.call(this);
    this.options = options = _.defaults(_.clone(options || {}), defaults);

    for (var k in defaults) {
        if (defaults[k] && _.isObject(defaults[k]) && !_.isArray(defaults[k])) {
            this.options[k] =
                _.defaults(_.clone(options[k] || {}), defaults[k]);
        }
    }
    options.transport = _.defaults(options.transport, defaults.transport);

    this._q = async.queue(this._callWorker.bind(this), 1);

    serializeMethods(options.casper);

    if (options.child.transport === 'http') {
        this._child = Spooky._instances[options.port] = this._spawnChild();

        var server = new RequestStream({
            host: options.transport.http.host,
            port: options.child.port
        });

        server.setMaxListeners(0);

        this._rpcClient = new tinyjsonrpc.StreamClient({
            server: server
        });
    } else if (options.child.transport === 'stdio') {
        this._child =
            Spooky._instances['stdio' + Spooky._nextInstanceId++] =
                this._spawnChild();

        this._rpcClient = new tinyjsonrpc.StreamClient({
            server: duplex(this._child.stdin,
                new FilteredStream(this._child.stdout, isJsonRpcResponse))
        });

        // must terminate requests with a linefeed
        this._rpcClient._send = function _send (request) {
            if (this._server.full) {
                this._server.buffer.push(request);
            } else {
                try {
                    request = JSON.stringify(request);
                } catch (e) {
                    throw 'Could not serialize request to JSON';
                }

                this._server.full = !this._server.stream.write(request + '\n');
            }
        };
    } else {
        throw new Error('Unknown transport ' + options.child.transport);
    }

    // listen for JSON-RPC requests from the child
    this._rpcServer = new tinyjsonrpc.StreamServer();
    this._rpcServer.listen(duplex(
            this._child.stdin,
            new FilteredStream(this._child.stdout, isJsonRpcRequest)));

    this._rpcServer.provide({
        emit: function () {
            this.emit.apply(this, arguments);

            return true;
        }.bind(this)
    });

    this.once('ready', function () {
        this._call('create',
            this._onCreate.bind(this, callback),
            options.casper
        );
    }.bind(this));
}