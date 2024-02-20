function dbGetDatabaseNamesError (tx, err) {
            if (calledDbCreateError) {
                return false;
            }
            const er = err ? webSQLErrback(/** @type {SQLError} */ (err)) : tx;
            calledDbCreateError = true;
            reject(er);
            return false;
        }