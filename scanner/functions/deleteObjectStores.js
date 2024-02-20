function deleteObjectStores (name) {
                var open = indexedDB.open(name, 2);
                open.onerror = open.onblocked = done;

                open.onupgradeneeded = function () {
                    // var db = open.result;
                    var store = open.transaction.objectStore('out-of-line');
                    store.deleteIndex('inline-index');
                    store.deleteIndex('dotted-index');
                };

                open.onsuccess = function () {
                    var db = open.result;
                    db.close();
                    setTimeout(function () {
                        verifyDatabaseSchema(db.name);
                    }, 50);
                };
            }