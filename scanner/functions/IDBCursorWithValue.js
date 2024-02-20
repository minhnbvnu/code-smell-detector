function IDBCursorWithValue () {
        const [query, direction, store, source, keyColumnName, valueColumnName, count] = args;
        IDBCursor.__super.call(this, query, direction, store, source, keyColumnName, valueColumnName, count);
        // @ts-expect-error It's ok
        this[Symbol.toStringTag] = 'IDBCursorWithValue';
        util.defineReadonlyProperties(this, 'value');
    }