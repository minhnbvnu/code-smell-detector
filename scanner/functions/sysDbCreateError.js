function sysDbCreateError (tx, err) {
        const er = webSQLErrback(/** @type {SQLError} */ (err) || tx);
        if (CFG.DEBUG) { console.log('Error in sysdb transaction - when creating dbVersions', err); }
        failure(er);
    }