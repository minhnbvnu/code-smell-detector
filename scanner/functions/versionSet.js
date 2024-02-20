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