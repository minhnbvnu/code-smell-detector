function dbCreateError (tx, err) {
        if (calledDbCreateError) {
            return false;
        }
        const er = err ? webSQLErrback(err) : /** @type {Error} */ (tx);
        calledDbCreateError = true;
        // Re: why bubbling here (and how cancelable is only really relevant for `window.onerror`) see: https://github.com/w3c/IndexedDB/issues/86
        const evt = createEvent('error', er, {bubbles: true, cancelable: true});
        req.__done = true;
        req.__error = er;
        req.__result = undefined; // Must be undefined if an error per `result` getter
        req.dispatchEvent(evt);
        return false;
    }