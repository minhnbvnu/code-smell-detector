function updateLock(file, options) {
    const lock = locks[file];

    /* istanbul ignore next */
    if (lock.updateTimeout) {
        return;
    }

    lock.updateDelay = lock.updateDelay || options.update;
    lock.updateTimeout = setTimeout(() => {
        const mtime = Date.now() / 1000;

        lock.updateTimeout = null;

        options.fs.utimes(getLockFile(file), mtime, mtime, (err) => {
            // Ignore if the lock was released
            if (lock.released) {
                return;
            }

            // Verify if we are within the stale threshold
            if (lock.lastUpdate <= Date.now() - options.stale &&
                lock.lastUpdate > Date.now() - options.stale * 2) {
                return compromisedLock(file, lock, Object.assign(new Error(lock.updateError || 'Unable to update lock within the stale \
threshold'), { code: 'ECOMPROMISED' }));
            }

            // If the file is older than (stale * 2), we assume the clock is moved manually,
            // which we consider a valid case

            // If it failed to update the lockfile, keep trying unless
            // the lockfile was deleted!
            if (err) {
                if (err.code === 'ENOENT') {
                    return compromisedLock(file, lock, Object.assign(err, { code: 'ECOMPROMISED' }));
                }

                lock.updateError = err;
                lock.updateDelay = 1000;
                return updateLock(file, options);
            }

            // All ok, keep updating..
            lock.lastUpdate = Date.now();
            lock.updateError = null;
            lock.updateDelay = null;
            updateLock(file, options);
        });
    }, lock.updateDelay);

    // Unref the timer so that the nodejs process can exit freely
    // This is safe because all acquired locks will be automatically released
    // on process exit

    // We first check that `lock.updateTimeout.unref` exists because some users
    // may be using this module outside of NodeJS (e.g., in an electron app), 
    // and in those cases `setTimeout` return an integer.
    if (lock.updateTimeout.unref) {
        lock.updateTimeout.unref();
    }
}