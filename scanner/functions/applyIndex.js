function applyIndex (tx) {
            // Update the object store's index list
            IDBIndex.__updateIndexList(store, tx, function () {
                // Add index entries for all existing records
                tx.executeSql('SELECT "key", "value" FROM ' + util.escapeStoreNameForSQL(storeName), [], function (tx, data) {
                    if (CFG.DEBUG) { console.log('Adding existing ' + storeName + ' records to the ' + indexName + ' index'); }
                    addIndexEntry(0);

                    /**
                     * @param {Integer} i
                     * @returns {void}
                     */
                    function addIndexEntry (i) {
                        if (i < data.rows.length) {
                            try {
                                const value = Sca.decode(util.unescapeSQLiteResponse(data.rows.item(i).value));
                                const indexKey = Key.extractKeyValueDecodedFromValueUsingKeyPath(value, index.keyPath, index.multiEntry); // Todo: Do we need this stricter error checking?
                                if (
                                    ('invalid' in indexKey && indexKey.invalid) ||
                                    ('failure' in indexKey && indexKey.failure)
                                ) { // Todo: Do we need invalid checks and should we instead treat these as being duplicates?
                                    throw new Error('Go to catch; ignore bad indexKey');
                                }
                                const indexKeyStr = /** @type {string} */ (
                                    Key.encode(indexKey.value, index.multiEntry)
                                );
                                if (index.unique) {
                                    if (indexValues[indexKeyStr]) {
                                        indexValues = {};
                                        failure(createDOMException(
                                            'ConstraintError',
                                            'Duplicate values already exist within the store'
                                        ));
                                        return;
                                    }
                                    indexValues[indexKeyStr] = true;
                                }

                                tx.executeSql(
                                    'UPDATE ' + util.escapeStoreNameForSQL(storeName) + ' SET ' +
                                        util.escapeIndexNameForSQL(indexName) + ' = ? WHERE "key" = ?',
                                    [util.escapeSQLiteStatement(indexKeyStr), data.rows.item(i).key],
                                    function () {
                                        addIndexEntry(i + 1);
                                    },
                                    /** @type {SQLStatementErrorCallback} */ (error)
                                );
                            } catch (e) {
                                // Not a valid value to insert into index, so just continue
                                addIndexEntry(i + 1);
                            }
                        } else {
                            delete index.__pendingCreate;
                            delete indexHandle.__pendingCreate;
                            if (index.__deleted) {
                                delete index.__deleted;
                                delete indexHandle.__deleted;
                                index.__recreated = true;
                                indexHandle.__recreated = true;
                            }
                            indexValues = {};
                            success(store);
                        }
                    }
                }, /** @type {SQLStatementErrorCallback} */ (error));
            }, /** @type {SQLStatementErrorCallback} */ (error));
        }