function triggerAnyVersionChangeAndBlockedEvents (openConnections, req, oldVersion, newVersion) {
    // Todo: For Node (and in browser using service workers if available?) the
    //    connections ought to involve those in any process; should also
    //    auto-close if unloading

    /**
     * @param {IDBDatabase} connection
     * @returns {boolean|undefined}
     */
    const connectionIsClosed = (connection) => connection.__closePending;
    const connectionsClosed = () => openConnections.every((conn) => {
        return connectionIsClosed(conn);
    });
    return openConnections.reduce(function (promises, entry) {
        if (connectionIsClosed(entry)) {
            return promises;
        }
        return promises.then(function () {
            if (connectionIsClosed(entry)) {
                // Prior onversionchange must have caused this connection to be closed
                return undefined;
            }
            const e = /** @type {Event & IDBVersionChangeEvent} */ (
                new IDBVersionChangeEvent('versionchange', {oldVersion, newVersion})
            );
            return new SyncPromise(function (resolve) {
                setTimeout(() => {
                    entry.dispatchEvent(e); // No need to catch errors
                    resolve(undefined);
                });
            });
        });
    }, SyncPromise.resolve(undefined)).then(function () {
        if (connectionsClosed()) {
            return undefined;
        }
        return new SyncPromise(function (resolve) {
            const unblocking = {
                check () {
                    if (connectionsClosed()) {
                        resolve(undefined);
                    }
                }
            };
            const e = /** @type {Event & IDBVersionChangeEvent} */ (
                new IDBVersionChangeEvent('blocked', {oldVersion, newVersion})
            );
            setTimeout(() => {
                req.dispatchEvent(e); // No need to catch errors
                if (!connectionsClosed()) {
                    openConnections.forEach((connection) => {
                        if (!connectionIsClosed(connection)) {
                            connection.__unblocking = unblocking;
                        }
                    });
                } else {
                    resolve(undefined);
                }
            });
        });
    });
}