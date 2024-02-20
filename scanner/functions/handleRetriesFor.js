function handleRetriesFor(code) {
        return new Promise(function run(ok, fail) {
            try {
                ok(code());
            }
            catch (err) {
                if (err.retry && err.retry instanceof Promise) {
                    err.retry.then(function () { return run(ok, fail); })
                        .catch(function (perr) { return fail(perr); });
                }
                else if (err.restart && err.restart.isCallback) {
                    MathJax.Callback.After(function () { return run(ok, fail); }, err.restart);
                }
                else {
                    fail(err);
                }
            }
        });
    }