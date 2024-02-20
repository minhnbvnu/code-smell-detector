function IDBIndex () {
        const me = this;
        // @ts-expect-error It's ok
        me[Symbol.toStringTag] = 'IDBIndex';
        util.defineReadonlyProperties(me, readonlyProperties);
        me.__objectStore = store;
        me.__name = me.__originalName = indexProperties.columnName;
        me.__keyPath = Array.isArray(indexProperties.keyPath) ? indexProperties.keyPath.slice() : indexProperties.keyPath;
        const {optionalParams} = indexProperties;
        me.__multiEntry = Boolean(optionalParams && optionalParams.multiEntry);
        me.__unique = Boolean(optionalParams && optionalParams.unique);
        me.__deleted = Boolean(indexProperties.__deleted);
        me.__objectStore.__cursors = indexProperties.cursors || [];
        Object.defineProperty(me, '__currentName', {
            /**
             * @this {IDBIndexFull}
             * @returns {string}
             */
            get () {
                return '__pendingName' in me
                    ? /** @type {string} */ (me.__pendingName)
                    : me.name;
            }
        });
        Object.defineProperty(me, 'name', {
            enumerable: false,
            configurable: false,
            /**
             * @this {IDBIndexFull}
             * @returns {string}
             */
            get () {
                return this.__name;
            },
            /**
             * @param {string} newName
             * @this {IDBIndexFull}
             * @returns {void}
             */
            set (newName) {
                const me = this;
                newName = util.convertToDOMString(newName);
                const oldName = me.name;
                IDBTransaction.__assertVersionChange(me.objectStore.transaction);
                IDBTransaction.__assertActive(me.objectStore.transaction);
                IDBIndexAlias.__invalidStateIfDeleted(me);
                IDBObjectStore.__invalidStateIfDeleted(me);
                if (newName === oldName) {
                    return;
                }

                if (me.objectStore.__indexes[newName] && !me.objectStore.__indexes[newName].__deleted &&
                    !me.objectStore.__indexes[newName].__pendingDelete) {
                    throw createDOMException('ConstraintError', 'Index "' + newName + '" already exists on ' + me.objectStore.__currentName);
                }

                me.__name = newName;

                const {objectStore} = me;
                delete objectStore.__indexes[oldName];
                objectStore.__indexes[newName] = me;
                objectStore.indexNames.splice(objectStore.indexNames.indexOf(oldName), 1, newName);

                const storeHandle = /** @type {import('./IDBTransaction.js').IDBTransactionFull} */ (
                    objectStore.transaction
                ).__storeHandles[objectStore.name];
                const oldIndexHandle = storeHandle.__indexHandles[oldName];
                oldIndexHandle.__name = newName; // Fix old references
                storeHandle.__indexHandles[newName] = oldIndexHandle; // Ensure new reference accessible
                me.__pendingName = oldName;

                const colInfoToPreserveArr = [
                    ['key', 'BLOB ' + (objectStore.autoIncrement ? 'UNIQUE, inc INTEGER PRIMARY KEY AUTOINCREMENT' : 'PRIMARY KEY')],
                    ['value', 'BLOB']
                ].concat(
                    // @ts-expect-error Has numeric indexes instead of iterator
                    [...objectStore.indexNames]
                        .filter((indexName) => indexName !== newName)
                        .map((indexName) => [util.escapeIndexNameForSQL(indexName), 'BLOB'])
                );

                me.__renameIndex(
                    objectStore, oldName, newName, colInfoToPreserveArr,
                    function (tx, success) {
                        IDBIndexAlias.__updateIndexList(store, tx, function (store) {
                            delete storeHandle.__pendingName;
                            success(store);
                        });
                    }
                );
            }
        });
    }