function IDBTransaction () {
        const me = this;
        // @ts-expect-error It's ok
        me[Symbol.toStringTag] = 'IDBTransaction';
        util.defineReadonlyProperties(me, readonlyProperties);
        me.__id = ++uniqueID; // for debugging simultaneous transactions
        me.__active = true;
        me.__running = false;
        me.__errored = false;
        me.__requests = [];
        me.__objectStoreNames = storeNames;
        me.__mode = mode;
        me.__db = db;
        me.__error = null;
        // @ts-expect-error Part of `ShimEventTarget`
        me.__setOptions({
            legacyOutputDidListenersThrowFlag: true // Event hook for IndexedB
        });

        readonlyProperties.forEach((readonlyProp) => {
            Object.defineProperty(this, readonlyProp, {
                configurable: true
            });
        });
        util.defineListenerProperties(this, listeners);
        me.__storeHandles = {};

        // Kick off the transaction as soon as all synchronous code is done
        setTimeout(() => { me.__executeRequests(); }, 0);
    }