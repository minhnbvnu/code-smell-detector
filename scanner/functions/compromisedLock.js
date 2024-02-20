function compromisedLock(file, lock, err) {
    lock.released = true;                                    // Signal the lock has been released
    /* istanbul ignore next */
    lock.updateTimeout && clearTimeout(lock.updateTimeout);  // Cancel lock mtime update

    if (locks[file] === lock) {
        delete locks[file];
    }

    lock.compromised(err);
}