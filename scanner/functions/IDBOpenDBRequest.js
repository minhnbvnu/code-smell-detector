function IDBOpenDBRequest () {
        IDBRequest.__super.call(this);

        // @ts-expect-error It's ok
        this[Symbol.toStringTag] = 'IDBOpenDBRequest';
        // @ts-expect-error It's ok
        this.__setOptions({
            legacyOutputDidListenersThrowFlag: true, // Event hook for IndexedB
            extraProperties: ['oldVersion', 'newVersion', 'debug']
        }); // Ensure EventTarget preserves our properties
        util.defineListenerProperties(this, openListeners);
    }