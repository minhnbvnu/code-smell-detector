function VerifyRecordWasDeleted(e) {
                var cursor_rq = db.transaction("test")
                                  .objectStore("test")
                                  .openCursor();

                cursor_rq.onsuccess = function(e) {
                    var cursor = e.target.result;

                    if (!cursor) {
                        assert.equal(count, 1, 'count');
                        return done();
                    }

                    assert.equal(cursor.value.pKey, records[1].pKey);
                    count++;
                    cursor.continue();
                };
            }