function insertStoreInfo () {
                const encodedKeyPath = JSON.stringify(store.keyPath);
                tx.executeSql('INSERT INTO __sys__ VALUES (?,?,?,?,?)', [
                    util.escapeSQLiteStatement(storeName),
                    encodedKeyPath,
                    // For why converting here, see comment and following
                    //  discussion at:
                    //  https://github.com/axemclion/IndexedDBShim/issues/313#issuecomment-590086778
                    Number(store.autoIncrement),
                    '{}',
                    1
                ], function () {
                    delete store.__pendingCreate;
                    delete store.__deleted;
                    success(store);
                }, error);
            }