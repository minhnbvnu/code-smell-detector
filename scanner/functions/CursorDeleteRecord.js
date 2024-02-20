function CursorDeleteRecord(e) {
                var txn = db.transaction("test", "readwrite"),
                  cursor_rq = txn.objectStore("test").openCursor();

                cursor_rq.onsuccess = function(e) {
                    var cursor = e.target.result;

                    assert(cursor != null, "cursor exist");
                    cursor.delete();
                };
                txn.onerror = function (e) { throw e.target.error; }
                txn.oncomplete = VerifyRecordWasDeleted;
            }