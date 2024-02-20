function VerifyRecordWasUpdated(e) {
                var cursor_rq = db.transaction("test")
                                  .objectStore("test")
                                  .openCursor();

                cursor_rq.onsuccess = function(e) {
                    var cursor = e.target.result;

                    assert.equal(cursor.value.data, "New information!");
                    done();
                };
            }