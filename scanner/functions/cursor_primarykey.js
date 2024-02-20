function cursor_primarykey(key)
        {
            var db;

            var open_rq = createdb(done);
            open_rq.onupgradeneeded = function(e) {
                db = e.target.result;
                var objStore = db.createObjectStore("test");
                objStore.createIndex("index", "");

                objStore.add("data", key);
            };

            open_rq.onsuccess = function(e) {
                var cursor_rq = db.transaction("test")
                                  .objectStore("test")
                                  .index("index")
                                  .openCursor();

                cursor_rq.onsuccess = function(e) {
                    var cursor = e.target.result;

                    assert.equal(cursor.value, "data", "prequisite cursor.value");
                    assert.equal(cursor.key, "data", "prequisite cursor.key");

                    assert.deepEqual(cursor.primaryKey, key, 'primaryKey');
                    assert_readonly(cursor, 'primaryKey');

                    if (key instanceof Array) {
                        cursor.primaryKey.push("new");
                        key.push("new");

                        assert.deepEqual(cursor.primaryKey, key, 'primaryKey after array push');

                        // But we can not change key (like readonly, just a bit different)
                        try {
                            cursor.key = 10;
                        } catch (err) {}
                        assert.deepEqual(cursor.primaryKey, key, 'key after assignment');
                    }

                    count += 1;
                    if (count >= 3) {
                        done();
                    }
                };
            };
        }