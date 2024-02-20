function cursor_source(name, stringified_object, cursor_rq) {
            var cursor;

            cursor_rq.onsuccess = function(e) {
                if (!e.target.result) {
                    return;
                }
                cursor = e.target.result;
                assert_readonly(cursor, 'source');

                // Direct try
                assert(cursor.source instanceof Object, "source isobject");
                assert.equal(cursor.source + "", stringified_object, "source");
                assert.equal(cursor.source.name, name, "name");

                cursor.continue();
            };

            cursor_rq.transaction.oncomplete = function(e) {
                count += 1;
                if (count >= 2) {
                    done();
                }
             };

            cursor_rq.transaction.onerror = function(e) {
                throw new Error("Transaction got error. " + (e.target.error ? e.target.error.name : "unknown"));
            };
        }