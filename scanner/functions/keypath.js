function keypath(keypath, objects, expected_keys, desc) {
            numChecks += 1;

            var db,
                open_rq = createdb(done);

            open_rq.onupgradeneeded = function(e) {
                db = e.target.result;
                var objStore = db.createObjectStore("store", { keyPath: keypath });

                for (var i = 0; i < objects.length; i++)
                    objStore.add(objects[i]);
            };

            open_rq.onerror = function(e) {
                throw error;
            };

            open_rq.onsuccess = function(e) {
                var actual_keys = [],
                    rq = db.transaction("store")
                           .objectStore("store")
                           .openCursor();

                rq.onsuccess = function(e) {
                    var cursor = e.target.result;

                    if (cursor) {
                        actual_keys.push(cursor.key.valueOf());
                        cursor.continue();
                    } else {
                        assert.equal(actual_keys.length, expected_keys.length, "array length");
                        assert.deepEqual(actual_keys, expected_keys, "keyorder array");

                        numDone += 1;
                        if (numDone === numChecks) {
                            done();
                        }
                    }
                };
            };
        }