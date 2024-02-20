function testdir(dir, expect) {
                    var count = 0;
                    var rq = db.transaction("test").objectStore("test").openCursor(FDBKeyRange.bound("AA", "ZZ"), dir);
                    rq.onsuccess = function(e) {
                        var cursor = e.target.result;
                        if (!cursor) {
                            assert.equal(count, expect.length, "cursor runs");
                            doneCount += 1;
                            if (doneCount >= 4) {
                                done();
                            }
                            return;
                        }
                        assert.equal(cursor.value, expect[count], "cursor.value");
                        count++;
                        cursor.continue();
                    };
                    rq.onerror = function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        throw new Error("rq.onerror - " + e.message);
                    };
                }