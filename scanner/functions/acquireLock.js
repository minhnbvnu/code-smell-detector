function acquireLock(file, options, callback) {
    // Use mkdir to create the lockfile (atomic operation)
    options.fs.mkdir(getLockFile(file), (err) => {
        // If successful, we are done
        if (!err) {
            return callback();
        }

        // If error is not EEXIST then some other error occurred while locking
        if (err.code !== 'EEXIST') {
            return callback(err);
        }

        // Otherwise, check if lock is stale by analyzing the file mtime
        if (options.stale <= 0) {
            return callback(Object.assign(new Error('Lock file is already being hold'), { code: 'ELOCKED', file }));
        }

        options.fs.stat(getLockFile(file), (err, stat) => {
            if (err) {
                // Retry if the lockfile has been removed (meanwhile)
                // Skip stale check to avoid recursiveness
                if (err.code === 'ENOENT') {
                    return acquireLock(file, Object.assign({}, options, { stale: 0 }), callback);
                }

                return callback(err);
            }

            if (!isLockStale(stat, options)) {
                return callback(Object.assign(new Error('Lock file is already being hold'), { code: 'ELOCKED', file }));
            }

            // If it's stale, remove it and try again!
            // Skip stale check to avoid recursiveness
            removeLock(file, options, (err) => {
                if (err) {
                    return callback(err);
                }

                acquireLock(file, Object.assign({}, options, { stale: 0 }), callback);
            });
        });
    });
}