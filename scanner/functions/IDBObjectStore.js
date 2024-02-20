function IDBObjectStore () {
        const me = this;
        // @ts-expect-error It's ok
        me[Symbol.toStringTag] = 'IDBObjectStore';
        util.defineReadonlyProperties(this, readonlyProperties);
        me.__name = me.__originalName = storeProperties.name;
        me.__keyPath = Array.isArray(storeProperties.keyPath) ? storeProperties.keyPath.slice() : storeProperties.keyPath;
        me.__transaction = transaction;
        me.__idbdb = storeProperties.idbdb;
        me.__cursors = storeProperties.cursors || [];

        // autoInc is numeric (0/1) on WinPhone
        me.__autoIncrement = Boolean(storeProperties.autoInc);

        me.__indexes = {};
        me.__indexHandles = {};
        me.__indexNames = DOMStringList.__createInstance();
        const {indexList} = storeProperties;
        for (const indexName in indexList) {
            if (Object.hasOwn(indexList, indexName)) {
                const index = IDBIndex.__createInstance(me, indexList[indexName]);
                me.__indexes[index.name] = index;
                if (!index.__deleted) {
                    me.indexNames.push(index.name);
                }
            }
        }
        me.__oldIndexNames = me.indexNames.clone();
        Object.defineProperty(this, '__currentName', {
            get () {
                return '__pendingName' in this ? this.__pendingName : this.name;
            }
        });
        Object.defineProperty(this, 'name', {
            enumerable: false,
            configurable: false,
            /**
             * @this {IDBObjectStoreFull}
             * @returns {string}
             */
            get () {
                return this.__name;
            },
            /**
             * @param {string} name
             * @this {IDBObjectStoreFull}
             * @returns {void}
             */
            set (name) {
                const me = this;
                name = util.convertToDOMString(name);
                const oldName = me.name;
                IDBObjectStoreAlias.__invalidStateIfDeleted(me);
                IDBTransaction.__assertVersionChange(me.transaction);
                IDBTransaction.__assertActive(me.transaction);
                if (oldName === name) {
                    return;
                }
                if (me.__idbdb.__objectStores[name] && !me.__idbdb.__objectStores[name].__pendingDelete) {
                    throw createDOMException('ConstraintError', 'Object store "' + name + '" already exists in ' + me.__idbdb.name);
                }

                me.__name = name;

                const oldStore = me.__idbdb.__objectStores[oldName];
                oldStore.__name = name; // Fix old references
                me.__idbdb.__objectStores[name] = oldStore; // Ensure new reference accessible
                delete me.__idbdb.__objectStores[oldName]; // Ensure won't be found

                me.__idbdb.objectStoreNames.splice(me.__idbdb.objectStoreNames.indexOf(oldName), 1, name);

                const oldHandle = /** @type {IDBObjectStoreFull} */ (
                    /** @type {import('./IDBTransaction.js').IDBTransactionFull} */ (
                        me.transaction
                    ).__storeHandles[oldName]
                );
                oldHandle.__name = name; // Fix old references
                /** @type {import('./IDBTransaction.js').IDBTransactionFull} */ (
                    me.transaction
                ).__storeHandles[name] = oldHandle; // Ensure new reference accessible

                me.__pendingName = oldName;

                const sql = 'UPDATE __sys__ SET "name" = ? WHERE "name" = ?';
                const sqlValues = [util.escapeSQLiteStatement(name), util.escapeSQLiteStatement(oldName)];
                if (CFG.DEBUG) { console.log(sql, sqlValues); }
                /** @type {import('./IDBTransaction.js').IDBTransactionFull} */ (
                    me.transaction
                ).__addNonRequestToTransactionQueue(function objectStoreClear (tx, args, success, error) {
                    tx.executeSql(sql, sqlValues, function (tx) {
                        // This SQL preserves indexes per https://www.sqlite.org/lang_altertable.html
                        const sql = 'ALTER TABLE ' + util.escapeStoreNameForSQL(oldName) + ' RENAME TO ' + util.escapeStoreNameForSQL(name);
                        if (CFG.DEBUG) { console.log(sql); }
                        tx.executeSql(sql, [], function () {
                            delete me.__pendingName;
                            success();
                        });
                    }, function (tx, err) {
                        error(err);
                        return false;
                    });
                });
            }
        });
    }