function sendHttpRequest(client, options, args, start, timings, reqStart, key, cache, expires, uniqueId, status, retry, redirects) {

    var packet = {
        line: args.statement.line,
        uuid: args.parentEvent.uuid,
        method: options.method,
        uri: args.uri,
        headers: [],
        start: reqStart,
        type: eventTypes.STATEMENT_REQUEST
    };

    _.each(args.headers, function(v, n) {
        packet.headers.push({
            name: n,
            value: v
        });
    });

    var responseLength = 0;
    args.httpReqTx = args.logEmitter.beginEvent({
        parent: args.parentEvent,
        name: 'http-request',
        message: packet,
        cb: function(err, results){
            var processingEvent = args.logEmitter.beginEvent({
                parent: args.parentEvent,
                name: 'processingEvent',
                message: 'calculates cpu time',
                cb: function(){}
            })
            if(args.logEmitter){
                var reqlength = JSON.stringify(options.headers).length +options.host.length;
                if(options.body){
                    reqlength += JSON.stringify(options.body).length
                }
                args.logEmitter.emitEvent(JSON.stringify({
                    reqSize: reqlength,
                    resSize: responseLength
                }))
            }
            processingEvent.end();
            var toreturn = args.cb(err, results);
            return toreturn

        }
    });

    if(args.emitter) {
        packet.id = uniqueId;
        // Add the body here to avoid logging body to logEmitter
        if(args.body) {
            packet.body = args.body;
        }
        args.emitter.emit(packet.type, packet);

    }

    if (args.parts && args.statement.parts) {
        var form = new FormData();
        if (args.body) {
            form.append('body', new Buffer(args.body));
        }

        var tmp_parts = { 'req' : { 'parts' : args.parts }};

        _.each(args.statement.parts, function(p) {
            var part = jsonfill.lookup(p, tmp_parts);

            if (part) {
                form.append(part.name, part.data);
            }
        });

        _.extend(options.headers, form.getCustomHeaders(args.resource.body.type));
    }

    var followRedirects = true, maxRedirects = 10;

    // Exponential backff with a reset
    var minDelay = args.statement.minDelay|| 500;
    var maxDelay = args.statement.maxDelay || 30000;
    var timeout = args.statement.timeout || 10000;
    var decision = charlie.ask([args.uri, args.name], minDelay, maxDelay);
    if(decision.state === 'nogo') {
        var err = new Error('Back-off in progress');
        err.uri = args.uri;
        err.status = 502;
        err.start = decision.start;
        err.count = decision.count;
        err.delay = decision.delay;
        return args.httpReqTx.cb(err);
    }

    // As of node 0.6.17, 'timeout' events can get emitted after we get a valid response from
    // the socket. We need to work-around that for now.
    var happy = false; // This flag keeps track of whether we're getting response and to skip timeout events.
    var clientRequest = client.request(options, function (res) {
        // Tell charlie that things are good.
        charlie.ok([args.uri, args.name]);

        if (followRedirects && (res.statusCode >= 301 && res.statusCode <= 307) &&
            (options.method.toUpperCase() === 'GET' || options.method.toUpperCase() === 'HEAD')) {
            res.socket.destroy();
            if (res.statusCode === 305) { // Log but don't follow
                args.logEmitter.emitWarning(args.httpReqTx.event, JSON.stringify({
                    status: res.statusCode, headers: res.headers
                }));
                var err = new Error('Received status code 305 from downstream server');
                err.uri = args.uri;
                err.status = 502;
                return args.httpReqTx.cb(err);
            }
            else if (res.statusCode !== 304 && res.statusCode !== 306) { // Only follow 301, 302, 303, 307
                if (res.headers.location) {
                    if (redirects++ >= maxRedirects) {
                        args.logEmitter.emitError(args.httpReqTx.event, JSON.stringify({
                            redirects: maxRedirects
                        }));
                        var err = new Error('Exceeded max redirects');
                        err.uri = args.uri;
                        err.status = 502;
                        return args.httpReqTx.cb(err);
                    }

                    var location = new URI(res.headers.location);

                    if (location.isAbsolute()) {
                        options.host = location.heirpart().authority().host();
                        options.port = location.heirpart().authority().port();
                    } else {
                        location = new URI(args.uri);
                        location = location.resolveReference(res.headers.location);
                    }
                    options.path = location.heirpart().path();

                    args.logEmitter.emitEvent(args.httpReqTx.event, {
                        redirects: redirects,
                        status: res.statusCode,
                        location: res.headers.location
                    });

                    // End the current event.
                    args.logEmitter.endEvent(args.httpReqTx.event, 'Redirecting to ' + res.headers.location);

                    sendHttpRequest(client, options, args, start, timings, reqStart, key, cache, expires, uniqueId, status, retry, redirects);
                    return;
                }
                else {
                    args.logEmitter.emitError(args.httpReqTx.event, JSON.stringify({
                        message: 'Missing location header',
                        status: res.statusCode,
                        headers: res.headers
                    }));
                    var err = new Error('Missing Location header in redirect');
                    err.uri = args.uri;
                    err.status = 502;
                    return args.httpReqTx.cb(err);
                }
            }
        }

        var bufs = []; // array for bufs for each chunk
        var contentEncoding = res.headers['content-encoding'];
        var zipped = false, unzip;
        var result;
        if (contentEncoding) {
            contentEncoding = contentEncoding.toLowerCase();
            if (contentEncoding === 'gzip') {
                unzip = zlib.createGunzip();
            }
            else if (contentEncoding === 'deflate') {
                unzip = zlib.createInflate();
            }
            else {
                var err = new Error('Content-Encoding \'' + contentEncoding + '\' is not supported');
                err.uri = args.uri;
                err.status = 502;
                args.logEmitter.emitError(args.httpReqTx.event, JSON.stringify({
                    message: 'Content encoding ' + contentEncoding + ' is not supported'
                }));
                res.socket.destroy();
                return args.httpReqTx.cb(err);
            }
            zipped = true;

            unzip.on('data', function (chunk) {
                bufs.push(chunk);
            });
            unzip.on('end', function () {
                result = response.parseResponse(timings, reqStart, args, res, bufs);
                putInCache(key, cache, result, res, expires);
                response.exec(timings, reqStart, args, uniqueId, res, start, result, options);
            });
            unzip.on('error', function (err) {
                var err = new Error('Corrupted stream');
                err.uri = args.uri;
                err.status = 502;
                args.logEmitter.emitError(args.httpReqTx.event, JSON.stringify({
                    message: contentEncoding + ' stream corrupted'
                }));
                res.socket.destroy();
                return args.httpReqTx.cb(err);
            });
        }

        res.on('data', function (chunk) {
            happy = true;
            if (zipped) {
                // TODO Check for corrupted stream. Empty 'bufs' may indicate invalid stream
                unzip.write(chunk);
            }
            else {
                // Chunk is a buf as we don't set any encoding on the response
                bufs.push(chunk);
            }
            responseLength += chunk.length;
            maxResponseLength = maxResponseLength || getMaxResponseLength(args.config, args.logEmitter);
            if (responseLength > maxResponseLength) {
                var err = new Error('Response length exceeds limit');
                err.uri = args.uri;
                err.status = 502;

                args.logEmitter.emitError(args.httpReqTx.event, JSON.stringify({
                    message: 'Response length ' + responseLength + ' exceeds config.maxResponseLength of ' + maxResponseLength
                }));
                res.socket.destroy();
                return args.httpReqTx.cb(err);
            }
        });
        res.on('end', function () {
            happy = true;
            if (zipped) {
                unzip.end();
            }
            else {
                result = response.parseResponse(timings, reqStart, args, res, bufs);
                putInCache(key, cache, result, res, expires);
                response.exec(timings, reqStart, args, uniqueId, res, start, result, options, status);
            }
        });
    });

    if (args.parts && form) {
        form.pipe(clientRequest);
        timings.send = Date.now() - reqStart;
    } else if (args.body) {
        clientRequest.write(args.body);
        timings.send = Date.now() - reqStart;
    }


    var timedout = false;
    clientRequest.setTimeout(timeout, function() {
        if(happy) {
            args.logEmitter.emitWarning(args.httpReqTx.event, {
                message: "'timeout' received when not expected"
            });
            return;
        }
        timedout = true;

        if (retry === 0 && args.statement.type === 'select') {
            _retry(args, client, options, 'timeout');
        }
        else {
            // No need to end/destroy the socket since node does it.
            charlie.notok([args.uri, args.name]);
            return args.httpReqTx.end({
                message: 'Request timed out',
                timeout: timeout,
                uri: args.uri,
                status: 502
            });
        }
    });
    clientRequest.on('error', function(err) {
        // timeout also triggers error
        if(timedout) {
            return;
        }
        // Destroy the socket first
        clientRequest.connection.destroy();

        args.logEmitter.emitError(args.httpReqTx.event, {
            message: err ? err.code || err.message : 'Network error'
        });
        // For select, retry once on network error
        if (!timedout && retry === 0 && args.statement.type === 'select') {
            _retry(args, client, options, 'Network Error');
        }
        else {
            charlie.notok([args.uri, args.name]);
            err = err || {
                message: err ? err.code || err.message : 'Network error'
            }
            err.uri = args.uri;
            err.status = 502;
            return args.httpReqTx.cb(err);
        }
    });
    clientRequest.end();
}