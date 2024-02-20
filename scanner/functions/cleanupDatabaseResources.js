function cleanupDatabaseResources (__openDatabase, name, escapedDatabaseName, databaseDeleted, dbError) {
    const useMemoryDatabase = typeof CFG.memoryDatabase === 'string';
    if (useMemoryDatabase) {
        const latestSQLiteDBCached = websqlDBCache[name] ? getLatestCachedWebSQLDB(name) : null;
        if (!latestSQLiteDBCached) {
            console.warn('Could not find a memory database instance to delete.');
            databaseDeleted();
            return;
        }
        const sqliteDB = latestSQLiteDBCached._db && latestSQLiteDBCached._db._db;
        if (!sqliteDB || !sqliteDB.close) {
            console.error('The `openDatabase` implementation does not have the expected `._db._db.close` method for closing the database');
            return;
        }
        sqliteDB.close(
            /**
             * @param {Error} err
             * @returns {void}
             */
            (err) => {
                if (err) {
                    console.warn('Error closing (destroying) memory database');
                    return;
                }
                databaseDeleted();
            }
        );
        return;
    }
    if (fs && CFG.deleteDatabaseFiles !== false) {
        fs.unlink(path.join(CFG.databaseBasePath || '', escapedDatabaseName), (err) => {
            if (err && err.code !== 'ENOENT') { // Ignore if file is already deleted
                dbError({
                    code: 0,
                    message: 'Error removing database file: ' + escapedDatabaseName + ' ' + err
                });
                return;
            }
            databaseDeleted();
        });
        return;
    }

    const sqliteDB = __openDatabase(
        path.join(CFG.databaseBasePath || '', escapedDatabaseName),
        '1',
        name,
        CFG.DEFAULT_DB_SIZE
    );
    sqliteDB.transaction(function (tx) {
        tx.executeSql('SELECT "name" FROM __sys__', [], function (tx, data) {
            const tables = data.rows;
            (function deleteTables (i) {
                if (i >= tables.length) {
                    // If all tables are deleted, delete the housekeeping tables
                    tx.executeSql('DROP TABLE IF EXISTS __sys__', [], function () {
                        databaseDeleted();
                    }, dbError);
                } else {
                    // Delete all tables in this database, maintained in the sys table
                    tx.executeSql('DROP TABLE ' + util.escapeStoreNameForSQL(
                        util.unescapeSQLiteResponse( // Avoid double-escaping
                            tables.item(i).name
                        )
                    ), [], function () {
                        deleteTables(i + 1);
                    }, function () {
                        deleteTables(i + 1);
                        return false;
                    });
                }
            }(0));
        }, function () {
            // __sys__ table does not exist, but that does not mean delete did not happen
            databaseDeleted();
            return false;
        });
    });
}