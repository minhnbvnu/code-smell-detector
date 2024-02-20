function cursor_direction(constant, dir)
            {
                var db,
                  expected = dir ? dir : "next";

                var open_rq = createdb(done);

                open_rq.onupgradeneeded = function(e) {
                    db = e.target.result;
                    var objStore = db.createObjectStore("test");

                    objStore.add("data", "key");
                };

                open_rq.onsuccess = function(e) {
                    var cursor_rq;
                    var os = db.transaction("test")
                               .objectStore("test");
                    if (dir)
                        cursor_rq = os.openCursor(undefined, dir);
                    else
                        cursor_rq = os.openCursor();

                    cursor_rq.onsuccess = function(e) {
                        var cursor = e.target.result;

                        assert.equal(cursor.direction, constant, 'direction constant');
                        assert.equal(cursor.direction, expected, 'direction');
                        assert_readonly(cursor, 'direction');
                    };

                    var cursor_rq2 = db.transaction("test")
                                      .objectStore("test")
                                      .openCursor(undefined, constant);

                    cursor_rq2.onsuccess = function(e) {
                        var cursor = e.target.result;

                        assert.equal(cursor.direction, constant, 'direction constant (second try)');
                        assert.equal(cursor.direction, expected, 'direction (second try)');
                        assert_readonly(cursor, 'direction');

                        count++;
                        if (count >= 5)
                            done();
                    };

                };
            }