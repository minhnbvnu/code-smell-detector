function pump_streams(streams, cb) {
        if (stream.pipeline)
            return stream.pipeline.apply(null, streams.concat(cb));
        var tmp = streams.shift();
        while (streams.length) {
            tmp = tmp.pipe(streams.shift());
            tmp.once('error', function (e) {
                cb && cb(e);
                cb = null;
            });
        }
    }