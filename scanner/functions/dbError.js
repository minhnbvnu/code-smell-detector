function dbError (tx, err) {
        if (calledDBError || err === true) {
            return false;
        }
        const er = webSQLErrback(/** @type {SQLError} */ (err || tx));
        sysdbFinishedCbDelete(true, function () {
            req.__done = true;
            req.__error = er;
            req.__result = undefined; // Must be undefined if an error per `result` getter
            // Re: why bubbling here (and how cancelable is only really relevant for `window.onerror`) see: https://github.com/w3c/IndexedDB/issues/86
            const e = createEvent('error', er, {bubbles: true, cancelable: true});
            req.dispatchEvent(e);
            calledDBError = true;
        });
        return false;
    }