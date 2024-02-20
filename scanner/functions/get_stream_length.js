function get_stream_length(stream, given_length, cb) {
        if (given_length > 0)
            return cb(given_length);
        if (stream.end !== void 0 && stream.end !== Infinity && stream.start !== void 0)
            return cb((stream.end + 1) - (stream.start || 0));
        fs.stat(stream.path, function (err, stat) {
            cb(stat ? stat.size - (stream.start || 0) : null);
        });
    }