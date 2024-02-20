function removeLock(file, options, callback) {
    // Remove lockfile, ignoring ENOENT errors
    options.fs.rmdir(getLockFile(file), (err) => {
        if (err && err.code !== 'ENOENT') {
            return callback(err);
        }

        callback();
    });
}