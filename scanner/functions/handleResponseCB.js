function handleResponseCB(req, res, execState, err, results) {
        compress(req, res, {logEmitter : engine});   // TODO replace with a middleware
        var reqSize = req.url.length + JSON.stringify(req.headers).length + req.method.length +1
        var resSize = results ? JSON.stringify(results).length : JSON.stringify(err).length
        engine.emitEvent("User's request size is " + reqSize + ", response size is "+resSize)

        var cb = req.param('callback');
        if (err) {
            var status = err.status || 400;
            res.writeHead(status, {
                'content-type' : 'application/json'
            });
            if (cb) {
                res.write(cb + '(');
            }
            res.write(JSON.stringify(err));
            if (cb) {
                res.write(cb + ')');
            }
            res.end();
        }
        else {
            var contentType = results.headers['content-type'];
            var h = {
                'Connection': serving ? 'keep-alive' : 'close',
                'Transfer-Encoding' : 'chunked'
            };
            _.each(results.headers, function(value, name) {
                h[name] = value;
            });
            h['content-type'] = cb ? 'application/javascript' : contentType;

            if(execState.length > 0) {
                h['Link'] = headers.format('Link', {
                    href : 'data:application/json,' + encodeURIComponent(JSON.stringify(execState)),
                    rel : ['execstate']
                });
            }
            res.writeHead(200, h);
            if (cb) {
                res.write(cb + '(');
            }
            if(results.body) {
                if (contentType === 'application/json') {
                    res.write(JSON.stringify(results.body));
                }
                else {
                    res.write(results.body);
                }
            }
            if (cb) {
                res.write(')');
            }
            res.end();
        }
        // If we get a 'close' event, end on all pending connections.
        if(!serving) {
            req.connection.end();
        }
    }