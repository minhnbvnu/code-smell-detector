function IDBDatabase () {
        // @ts-expect-error It's ok
        this[Symbol.toStringTag] = 'IDBDatabase';
        util.defineReadonlyProperties(this, readonlyProperties);
        this.__db = db;
        this.__closePending = false;
        this.__oldVersion = oldVersion;
        this.__version = version;
        this.__name = name;
        this.__upgradeTransaction = null;
        util.defineListenerProperties(this, listeners);
        // @ts-expect-error Part of `ShimEventTarget`
        this.__setOptions({
            legacyOutputDidListenersThrowFlag: true // Event hook for IndexedB
        });

        this.__transactions = [];

        /** @type {{[key: string]: IDBObjectStore}} */
        this.__objectStores = {};
        this.__objectStoreNames = DOMStringList.__createInstance();

        /**
         * @type {IDBObjectStoreProperties}
         */
        const itemCopy = {};
        for (let i = 0; i < storeProperties.rows.length; i++) {
            const item = storeProperties.rows.item(i);
            // Safari implements `item` getter return object's properties
            //  as readonly, so we copy all its properties (except our
            //  custom `currNum` which we don't need) onto a new object
            itemCopy.name = item.name;
            itemCopy.keyPath = JSON.parse(item.keyPath);
            // Though `autoInc` is coming from the database as a NUMERIC
            // type (how SQLite stores BOOLEAN set in CREATE TABLE),
            // and should thus be parsed into a number here (0 or 1),
            // `IDBObjectStore.__createInstance` will convert to a boolean
            // when setting the store's `autoIncrement`.
            /** @type {const} */ (['autoInc', 'indexList']).forEach((prop) => {
                itemCopy[prop] = JSON.parse(item[prop]);
            });

            itemCopy.idbdb = this;
            const store = IDBObjectStore.__createInstance(itemCopy);
            this.__objectStores[store.name] = store;
            this.objectStoreNames.push(store.name);
        }
        this.__oldObjectStoreNames = this.objectStoreNames.clone();
    }