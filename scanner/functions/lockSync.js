function lockSync(file, options, compromised) {
    if (typeof options === 'function') {
        compromised = options;
        options = null;
    }

    options = options || {};
    options.fs = syncFs(options.fs || fs);
    options.retries = options.retries || 0;
    options.retries = typeof options.retries === 'number' ? { retries: options.retries } : options.retries;

    // Retries are not allowed because it requires the flow to be sync
    if (options.retries.retries) {
        throw Object.assign(new Error('Cannot use retries with the sync api'), { code: 'ESYNC' });
    }

    let err;
    let release;

    lock(file, options, compromised, (_err, _release) => {
        err = _err;
        release = _release;
    });

    if (err) {
        throw err;
    }

    return release;
}