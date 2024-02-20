function isLockStale(stat, options) {
    return stat.mtime.getTime() < Date.now() - options.stale;
}