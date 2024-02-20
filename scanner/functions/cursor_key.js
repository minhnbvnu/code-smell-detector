function cursor_key(key)
        {
            var db;

            var open_rq = createdb(done);
            open_rq.onupgradeneeded = function(e) {
                db = e.target.result;
                var objStore = db.createObjectStore("test");

                objStore.add("data", key);
            };

            open_rq.onsuccess = function(e) {
                var cursor_rq = db.transaction("test")
                                  .objectStore("test")
                                  .openCursor();

                cursor_rq.onsuccess = function(e) {
                    var cursor = e.target.result;
                    assert.equal(cursor.value, "data", "prequisite cursor.value");

                    assert.deepEqual(cursor.key, key, 'key');
                    assert_readonly(cursor, 'key');

                    if (key instanceof Array) {
                        cursor.key.push("new");
                        key.push("new");

                        assert.deepEqual(cursor.key, key, 'key after array push');

                        // But we can not change key (like readonly, just a bit different)
                        try {
                            cursor.key = 10;
                        } catch (err) {}
                        assert.deepEqual(cursor.key, key, 'key after assignment');
                    }

                    count += 1;
                    if (count >= 3) {
                        done();
                    }
                };
            };
        }