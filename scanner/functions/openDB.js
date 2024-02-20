function openDB (oldVersion) {
        /** @type {DatabaseFull} */
        let db;
        if ((useMemoryDatabase || useDatabaseCache) && name in websqlDBCache && websqlDBCache[name][version]) {
            db = websqlDBCache[name][version];
        } else {
            db = me.__openDatabase(
                useMemoryDatabase ? CFG.memoryDatabase : path.join(CFG.databaseBasePath || '', escapedDatabaseName),
                '1',
                name,
                CFG.DEFAULT_DB_SIZE
            );
            if (useDatabaseCache) {
                if (!(name in websqlDBCache)) {
                    websqlDBCache[name] = {};
                }
                websqlDBCache[name][version] = db;
            }
        }

        if (version === undefined) {
            version = oldVersion || 1;
        }
        if (oldVersion > version) {
            const err = createDOMException('VersionError', 'An attempt was made to open a database using a lower version than the existing version.', version);
            if (useDatabaseCache) {
                setTimeout(() => {
                    dbCreateError(err);
                });
            } else {
                dbCreateError(err);
            }
            return;
        }

        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS __sys__ (name BLOB, keyPath BLOB, autoInc BOOLEAN, indexList BLOB, currNum INTEGER)', [], function () {
                /**
                 * @returns {void}
                 */
                function setup () {
                    setupDatabase(tx, db, oldVersion);
                }
                if (!CFG.createIndexes) {
                    setup();
                    return;
                }
                tx.executeSql('CREATE INDEX IF NOT EXISTS sysname ON __sys__(name)', [], setup, dbCreateError);
            }, /** @type {SQLStatementErrorCallback} */ (dbCreateError));
        }, dbCreateError);
    }