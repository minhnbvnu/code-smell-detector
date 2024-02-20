function createSchemaItem (tx, schemaItem) {
        switch (schemaItem) {
        case 'out-of-line':
        case 'out-of-line-compound':
            tx.db.createObjectStore(schemaItem);
            break;
        case 'out-of-line-generated':
            tx.db.createObjectStore(schemaItem, {autoIncrement: true});
            break;
        case 'inline':
            tx.db.createObjectStore(schemaItem, {keyPath: 'id'});
            break;
        case 'inline-generated':
            tx.db.createObjectStore(schemaItem, {keyPath: 'id', autoIncrement: true});
            break;
        case 'inline-compound':
            tx.db.createObjectStore(schemaItem, {keyPath: ['id', 'name']});
            break;
        case 'dotted':
            tx.db.createObjectStore(schemaItem, {keyPath: 'name.first'});
            break;
        case 'dotted-generated':
            tx.db.createObjectStore(schemaItem, {keyPath: 'name.first', autoIncrement: true});
            break;
        case 'dotted-compound':
            tx.db.createObjectStore(schemaItem, {keyPath: ['id', 'name.first', 'name.last']});
            break;
        case 'inline-index':
            createIndex(schemaItem, 'id');
            break;
        case 'unique-index':
            createIndex(schemaItem, 'id', {unique: true});
            break;
        case 'multi-entry-index':
            createIndex(schemaItem, 'id', {multiEntry: true});
            break;
        case 'unique-multi-entry-index':
            createIndex(schemaItem, 'id', {unique: true, multiEntry: true});
            break;
        case 'dotted-index':
            createIndex(schemaItem, 'name.first');
            break;
        case 'compound-index':
            createIndex(schemaItem, ['id', 'name.first', 'name.last']);
            break;
        case 'compound-index-unique':
            createIndex(schemaItem, ['id', 'name.first', 'name.last'], {unique: true});
            break;
        default:
            throw new Error(schemaItem + ' is not one of the pre-defined schema items');
        }

        /**
         * Creates an index on all object stores.
         * @param {string} name
         * @param {string|string[]} keyPath
         * @param {IDBIndexParameters} options
         * @returns {void}
         */
        function createIndex (name, keyPath, options) {
            for (var i = 0; i < tx.db.objectStoreNames.length; i++) {
                var store = tx.objectStore(tx.db.objectStoreNames[i]);
                store.createIndex(name, keyPath, options);
            }
        }
    }