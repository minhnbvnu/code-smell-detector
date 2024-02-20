function keygenerator(objects, expected_keys, desc, func) {
            numChecks += 1;
            var db;

            var open_rq = createdb(done);
            open_rq.onupgradeneeded = function(e) {
                db = e.target.result;
                var objStore = db.createObjectStore("store", { keyPath: "id", autoIncrement: true });

                for (var i = 0; i < objects.length; i++)
                {
                    if (objects[i] === null)
                        objStore.add({});
                    else
                        objStore.add({ id: objects[i] });
                }
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
                    }
                    else {
                        assert.deepEqual(actual_keys, expected_keys, "keygenerator array");

                        numDone += 1;
                        if (numDone === numChecks) {
                            done();
                        }
                    }
                };
            };
        }