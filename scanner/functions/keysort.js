function keysort(desc, unsorted, expected) {
            var db,
                store_name = 'store-' + Date.now() + Math.random();

            numStarted += 1;

            // The database test
            var open_rq = createdb(done);
            open_rq.onupgradeneeded = function(e) {
                db = e.target.result;
                var objStore = db.createObjectStore(store_name);

                for (var i = 0; i < unsorted.length; i++)
                    objStore.add("value", unsorted[i]);
            };

            open_rq.onsuccess = function(e) {
                var actual_keys = [],
                  rq = db.transaction(store_name)
                         .objectStore(store_name)
                         .openCursor();

                rq.onsuccess = function(e) {
                    var cursor = e.target.result;

                    if (cursor) {
                        actual_keys.push(cursor.key.valueOf());
                        cursor.continue();
                    }
                    else {
                        assert.deepEqual(actual_keys, expected, "keyorder array");
                        assert.equal(actual_keys.length, expected.length, "array length");

                        numFinished += 1;
                        if (numFinished === numStarted) {
                            done();
                        }
                    }
                };
            };

            // The IDBKey.cmp test
            var sorted = unsorted.slice(0).sort(function(a, b) { return indexedDB.cmp(a, b)});

            for (var i in sorted)
                if (typeof sorted[i] === "object" && 'valueOf' in sorted[i])
                    sorted[i] = sorted[i].valueOf();

            assert.deepEqual(sorted, expected, "sorted array");
        }