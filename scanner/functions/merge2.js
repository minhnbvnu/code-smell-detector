function merge2() {
        const streamsQueue = [];
        const args = slice.call(arguments);
        let merging = false;
        let options = args[args.length - 1];
        if (options && !Array.isArray(options) && options.pipe == null) {
            args.pop();
        }
        else {
            options = {};
        }
        const doEnd = options.end !== false;
        const doPipeError = options.pipeError === true;
        if (options.objectMode == null) {
            options.objectMode = true;
        }
        if (options.highWaterMark == null) {
            options.highWaterMark = 64 * 1024;
        }
        const mergedStream = PassThrough(options);
        function addStream() {
            for (let i = 0, len = arguments.length; i < len; i++) {
                streamsQueue.push(pauseStreams(arguments[i], options));
            }
            mergeStream();
            return this;
        }
        function mergeStream() {
            if (merging) {
                return;
            }
            merging = true;
            let streams = streamsQueue.shift();
            if (!streams) {
                process.nextTick(endStream);
                return;
            }
            if (!Array.isArray(streams)) {
                streams = [streams];
            }
            let pipesCount = streams.length + 1;
            function next() {
                if (--pipesCount > 0) {
                    return;
                }
                merging = false;
                mergeStream();
            }
            function pipe(stream) {
                function onend() {
                    stream.removeListener('merge2UnpipeEnd', onend);
                    stream.removeListener('end', onend);
                    if (doPipeError) {
                        stream.removeListener('error', onerror);
                    }
                    next();
                }
                function onerror(err) {
                    mergedStream.emit('error', err);
                }
                // skip ended stream
                if (stream._readableState.endEmitted) {
                    return next();
                }
                stream.on('merge2UnpipeEnd', onend);
                stream.on('end', onend);
                if (doPipeError) {
                    stream.on('error', onerror);
                }
                stream.pipe(mergedStream, { end: false });
                // compatible for old stream
                stream.resume();
            }
            for (let i = 0; i < streams.length; i++) {
                pipe(streams[i]);
            }
            next();
        }
        function endStream() {
            merging = false;
            // emit 'queueDrain' when all streams merged.
            mergedStream.emit('queueDrain');
            if (doEnd) {
                mergedStream.end();
            }
        }
        mergedStream.setMaxListeners(0);
        mergedStream.add = addStream;
        mergedStream.on('unpipe', function (stream) {
            stream.emit('merge2UnpipeEnd');
        });
        if (args.length) {
            addStream.apply(null, args);
        }
        return mergedStream;
    }