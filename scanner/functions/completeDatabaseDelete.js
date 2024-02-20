function completeDatabaseDelete () {
                req.__result = undefined;
                req.__done = true;
                const e = /** @type {Event & IDBVersionChangeEvent} */ (
                    new IDBVersionChangeEvent('success', {oldVersion: version, newVersion: null})
                );
                req.dispatchEvent(e);
            }