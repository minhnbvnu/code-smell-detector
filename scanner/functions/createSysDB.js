function createSysDB (__openDatabase, success, failure) {
    /**
     *
     * @param {boolean|SQLTransaction|SQLError} tx
     * @param {SQLError} [err]
     * @returns {void}
     */
    function sysDbCreateError (tx, err) {
        const er = webSQLErrback(/** @type {SQLError} */ (err) || tx);
        if (CFG.DEBUG) { console.log('Error in sysdb transaction - when creating dbVersions', err); }
        failure(er);
    }

    if (sysdb) {
        success();
    } else {
        sysdb = __openDatabase(
            typeof CFG.memoryDatabase === 'string'
                ? CFG.memoryDatabase
                : path.join(
                    (typeof CFG.sysDatabaseBasePath === 'string'
                        ? CFG.sysDatabaseBasePath
                        : (CFG.databaseBasePath || '')),
                    '__sysdb__' + (CFG.addSQLiteExtension !== false ? '.sqlite' : '')
                ),
            '1',
            'System Database',
            CFG.DEFAULT_DB_SIZE
        );
        sysdb.transaction(function (systx) {
            systx.executeSql('CREATE TABLE IF NOT EXISTS dbVersions (name BLOB, version INT);', [], function (systx) {
                if (!CFG.useSQLiteIndexes) {
                    success();
                    return;
                }
                systx.executeSql(
                    'CREATE INDEX IF NOT EXISTS dbvname ON dbVersions(name)',
                    [],
                    success,
                    /** @type {SQLStatementErrorCallback} */ (sysDbCreateError)
                );
            }, /** @type {SQLStatementErrorCallback} */ (sysDbCreateError));
        }, sysDbCreateError);
    }
}