function checkSync(file, options) {
    options = options || {};
    options.fs = syncFs(options.fs || fs);

    let err;
    let locked;

    check(file, options, (_err, _locked) => {
        err = _err;
        locked = _locked;
    });

    if (err) {
        throw err;
    }

    return locked;
}