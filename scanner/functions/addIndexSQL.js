function addIndexSQL (tx) {
            if (!CFG.useSQLiteIndexes) {
                applyIndex(tx);
                return;
            }
            tx.executeSql(
                'CREATE INDEX IF NOT EXISTS "' +
                    // The escaped index name must be unique among indexes in the whole database;
                    //    so we prefix with store name; as prefixed, will also not conflict with
                    //    index on `key`
                    // Avoid quotes and separate with special escape sequence
                    escapedStoreNameSQL.slice(1, -1) + '^5' + escapedIndexNameSQL.slice(1, -1) +
                    '" ON ' + escapedStoreNameSQL + '(' + escapedIndexNameSQL + ')',
                [],
                applyIndex,
                /** @type {SQLStatementErrorCallback} */ (error)
            );
        }