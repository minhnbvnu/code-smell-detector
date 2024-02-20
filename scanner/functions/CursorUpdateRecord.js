function CursorUpdateRecord(e) {
                var txn = db.transaction("test", "readwrite"),
                  cursor_rq = txn.objectStore("test")
                                 .openCursor();
                cursor_rq.onsuccess = function(e) {
                    var cursor = e.target.result;

                    cursor.value.data = "New information!";
                    cursor.update(cursor.value);
                };

                txn.oncomplete = VerifyRecordWasUpdated;
            }