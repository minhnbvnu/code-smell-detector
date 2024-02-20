function valid_key(desc, key) {
            numChecks += 1;

            var db;
            var open_rq = createdb(done);
            var store, store2;

            open_rq.onupgradeneeded = function(e) {
                db = e.target.result;

                store = db.createObjectStore("store");
                assert(store.add('value', key) instanceof FDBRequest);

                store2 = db.createObjectStore("store2", { keyPath: ["x", "keypath"] });
                assert(store2.add({ x: 'v', keypath: key }) instanceof FDBRequest);
            };
            open_rq.onsuccess = function(e) {
                var rq = db.transaction("store")
                           .objectStore("store")
                           .get(key)
                rq.onsuccess = function(e) {
                    assert.equal(e.target.result, 'value')
                    var rq = db.transaction("store2")
                               .objectStore("store2")
                               .get(['v', key])
                    rq.onsuccess = function(e) {
                        assert.deepEqual(e.target.result, { x: 'v', keypath: key })
                        numDone += 1;
                        if (numDone === numChecks) {
                            done();
                        }
                    };
                };
            }
        }