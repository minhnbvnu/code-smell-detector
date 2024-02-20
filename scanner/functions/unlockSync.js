function unlockSync(file, options) {
    options = options || {};
    options.fs = syncFs(options.fs || fs);

    let err;

    unlock(file, options, (_err) => {
        err = _err;
    });

    if (err) {
        throw err;
    }
}