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