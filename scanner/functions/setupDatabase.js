function setupDatabase (tx, db, oldVersion) {
        tx.executeSql('SELECT "name", "keyPath", "autoInc", "indexList" FROM __sys__', [], function (tx, data) {
            /**
             * @returns {void}
             */
            function finishRequest () {
                req.__result = connection;
                req.__done = true;
            }
            const connection = IDBDatabase.__createInstance(db, name, oldVersion, version, data);
            if (!me.__connections[name]) {
                me.__connections[name] = [];
            }
            me.__connections[name].push(connection);

            if (oldVersion < version) {
                const openConnections = me.__connections[name].slice(0, -1);
                triggerAnyVersionChangeAndBlockedEvents(openConnections, req, oldVersion, version).then(function () {
                    // DB Upgrade in progress
                    /**
                     *
                     * @param {SQLTransaction} systx
                     * @param {boolean|SQLError|DOMException|Error} err
                     * @param {(tx?: SQLTransaction|SQLError, err?: SQLError|SQLResultSet) => boolean} cb
                     * @returns {void}
                     */
                    let sysdbFinishedCb = function (systx, err, cb) {
                        if (err) {
                            try {
                                systx.executeSql('ROLLBACK', [], cb, cb);
                            } catch (er) {
                                // Browser may fail with expired transaction above so
                                //     no choice but to manually revert
                                sysdb.transaction(function (systx) {
                                    /**
                                     *
                                     * @param {string} msg
                                     * @throws {Error}
                                     * @returns {never}
                                     */
                                    function reportError (msg) {
                                        throw new Error('Unable to roll back upgrade transaction!' + (msg || ''));
                                    }

                                    // Attempt to revert
                                    if (oldVersion === 0) {
                                        systx.executeSql(
                                            'DELETE FROM dbVersions WHERE "name" = ?',
                                            [sqlSafeName],
                                            function () {
                                                // @ts-expect-error Force to work
                                                cb(reportError); // eslint-disable-line promise/no-callback-in-promise
                                            },
                                            // @ts-expect-error Force to work
                                            reportError
                                        );
                                    } else {
                                        systx.executeSql(
                                            'UPDATE dbVersions SET "version" = ? WHERE "name" = ?',
                                            [
                                                oldVersion, sqlSafeName
                                            ],
                                            cb,
                                            // @ts-expect-error Force to work
                                            reportError
                                        );
                                    }
                                });
                            }
                            return;
                        }
                        // In browser, should auto-commit
                        cb(); // eslint-disable-line promise/no-callback-in-promise
                    };

                    sysdb.transaction(function (systx) {
                        /**
                         * @returns {void}
                         */
                        function versionSet () {
                            const e = /** @type {import('eventtargeter').EventWithProps & Event & IDBVersionChangeEvent} */ (
                                new IDBVersionChangeEvent('upgradeneeded', {oldVersion, newVersion: version})
                            );
                            req.__result = connection;
                            connection.__upgradeTransaction = req.__transaction = req.__result.__versionTransaction = IDBTransaction.__createInstance(req.__result, req.__result.objectStoreNames, 'versionchange');
                            req.__done = true;

                            req.transaction.__addNonRequestToTransactionQueue(function onupgradeneeded (tx, args, finished /* , error */) {
                                req.dispatchEvent(e);

                                if (e.__legacyOutputDidListenersThrowError) {
                                    logError('Error', 'An error occurred in an upgradeneeded handler attached to request chain', /** @type {Error} */ (e.__legacyOutputDidListenersThrowError)); // We do nothing else with this error as per spec
                                    req.transaction.__abortTransaction(createDOMException('AbortError', 'A request was aborted.'));
                                    return;
                                }
                                finished();
                            });

                            // eslint-disable-next-line camelcase -- Clear API
                            req.transaction.on__beforecomplete = function (ev) {
                                connection.__upgradeTransaction = null;
                                /** @type {import('./IDBDatabase.js').IDBDatabaseFull} */ (
                                    req.__result
                                ).__versionTransaction = null;
                                sysdbFinishedCb(systx, false, function () {
                                    req.transaction.__transFinishedCb(false, function () {
                                        ev.complete();
                                        req.__transaction = null;
                                    });
                                    return false;
                                });
                            };

                            // eslint-disable-next-line camelcase -- Clear API
                            req.transaction.on__preabort = function () {
                                connection.__upgradeTransaction = null;
                                // We ensure any cache is deleted before any request error events fire and try to reopen
                                if (useDatabaseCache) {
                                    if (name in websqlDBCache) {
                                        delete websqlDBCache[name][version];
                                    }
                                }
                            };

                            // eslint-disable-next-line camelcase -- Clear API
                            req.transaction.on__abort = function () {
                                req.__transaction = null;
                                // `readyState` and `result` will be reset anyways by `dbCreateError` but we follow spec.
                                req.__result = undefined;
                                req.__done = false;

                                connection.close();
                                setTimeout(() => {
                                    const err = createDOMException('AbortError', 'The upgrade transaction was aborted.');
                                    sysdbFinishedCb(systx, err, function (reportError) {
                                        if (oldVersion === 0) {
                                            cleanupDatabaseResources(
                                                me.__openDatabase,
                                                name,
                                                escapedDatabaseName,
                                                dbCreateError.bind(null, err),
                                                // @ts-expect-error It's ok
                                                reportError || dbCreateError
                                            );
                                            return false;
                                        }
                                        dbCreateError(err);
                                        return false;
                                    });
                                });
                            };

                            // eslint-disable-next-line camelcase -- Clear API
                            req.transaction.on__complete = function () {
                                if (/** @type {import('./IDBDatabase.js').IDBDatabaseFull} */ (
                                    req.__result
                                ).__closePending) {
                                    req.__transaction = null;
                                    const err = createDOMException('AbortError', 'The connection has been closed.');
                                    dbCreateError(err);
                                    return;
                                }
                                // Since this is running directly after `IDBTransaction.complete`,
                                //   there should be a new task. However, while increasing the
                                //   timeout 1ms in `IDBTransaction.__executeRequests` can allow
                                //   `IDBOpenDBRequest.onsuccess` to trigger faster than a new
                                //   transaction as required by "transaction-create_in_versionchange" in
                                //   w3c/Transaction.js (though still on a timeout separate from this
                                //   preceding `IDBTransaction.oncomplete`), this causes a race condition
                                //   somehow with old transactions (e.g., for the Mocha test,
                                //   in `IDBObjectStore.deleteIndex`, "should delete an index that was
                                //   created in a previous transaction").
                                // setTimeout(() => {

                                finishRequest();

                                req.__transaction = null;
                                const e = createEvent('success');
                                req.dispatchEvent(e);
                                // });
                            };
                        }

                        if (oldVersion === 0) {
                            systx.executeSql('INSERT INTO dbVersions VALUES (?,?)', [sqlSafeName, version], versionSet, dbCreateError);
                        } else {
                            systx.executeSql('UPDATE dbVersions SET "version" = ? WHERE "name" = ?', [version, sqlSafeName], versionSet, dbCreateError);
                        }
                    }, dbCreateError, undefined, function (currentTask, err, done, rollback, commit) {
                        if (currentTask.readOnly || err) {
                            return true;
                        }
                        sysdbFinishedCb = function (systx, err, cb) {
                            if (err) {
                                rollback(err, cb);
                            } else {
                                commit(cb);
                            }
                        };
                        return false;
                    });
                    return undefined;
                }).catch((err) => {
                    console.log('Error within `triggerAnyVersionChangeAndBlockedEvents`');
                    throw err;
                });
            } else {
                finishRequest();

                const e = createEvent('success');
                req.dispatchEvent(e);
            }
        }, dbCreateError);
    }