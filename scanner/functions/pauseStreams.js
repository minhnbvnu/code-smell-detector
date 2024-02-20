function pauseStreams(streams, options) {
        if (!Array.isArray(streams)) {
            // Backwards-compat with old-style streams
            if (!streams._readableState && streams.pipe) {
                streams = streams.pipe(PassThrough(options));
            }
            if (!streams._readableState || !streams.pause || !streams.pipe) {
                throw new Error('Only readable stream can be merged.');
            }
            streams.pause();
        }
        else {
            for (let i = 0, len = streams.length; i < len; i++) {
                streams[i] = pauseStreams(streams[i], options);
            }
        }
        return streams;
    }