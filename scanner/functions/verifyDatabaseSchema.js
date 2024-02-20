function verifyDatabaseSchema (name) {
                var open = indexedDB.open(name, 2);
                open.onerror = open.onblocked = done;

                open.onsuccess = function () {
                    var db = open.result;
                    var tx = db.transaction('out-of-line');
                    var store = tx.objectStore('out-of-line');
                    tx.onerror = tx.onabort = done;

                    // Verify that the correct indexes exist
                    var indexNames = Array.prototype.slice.call(store.indexNames);
                    expect(indexNames).to.have.same.members([
                        'unique-index', 'multi-entry-index', 'unique-multi-entry-index',
                        'compound-index', 'compound-index-unique'
                    ]);

                    // Verify the properties of each index
                    verifySchema(store.index('unique-index'), {name: 'unique-index', objectStore: store, keyPath: 'id', multiEntry: false, unique: true});
                    verifySchema(store.index('multi-entry-index'), {name: 'multi-entry-index', objectStore: store, keyPath: 'id', multiEntry: true, unique: false});
                    verifySchema(store.index('unique-multi-entry-index'), {name: 'unique-multi-entry-index', objectStore: store, keyPath: 'id', multiEntry: true, unique: true});

                    if (env.isShimmed || !env.browser.isIE) {
                        // IE doesn't support compound indexes
                        verifySchema(store.index('compound-index'), {name: 'compound-index', objectStore: store, keyPath: ['id', 'name.first', 'name.last'], multiEntry: false, unique: false});
                        verifySchema(store.index('compound-index-unique'), {name: 'compound-index-unique', objectStore: store, keyPath: ['id', 'name.first', 'name.last'], multiEntry: false, unique: true});
                    }

                    tx.oncomplete = function () {
                        db.close();
                        done();
                    };
                };
            }