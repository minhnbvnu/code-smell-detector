function list_order(desc, unsorted, expected) {
            var objStore, db;

            var open_rq = createdb(done);
            open_rq.onupgradeneeded = function(e) {
                db = e.target.result;
                for (var i = 0; i < unsorted.length; i++)
                    objStore = db.createObjectStore(unsorted[i]);

                assert.equal(db.objectStoreNames.length, expected.length, "objectStoreNames length");
                for (var i = 0; i < expected.length; i++)
                   assert.equal(db.objectStoreNames[i], expected[i], "objectStoreNames["+i+"]");

                for (var i = 0; i < unsorted.length; i++)
                    objStore.createIndex(unsorted[i], "length");

                assert.equal(objStore.indexNames.length, expected.length, "indexNames length");
                for (var i = 0; i < expected.length; i++)
                    assert.equal(objStore.indexNames[i], expected[i], "indexNames["+i+"]");
            };

            open_rq.onsuccess = function(e) {
                assert.equal(db.objectStoreNames.length, expected.length, "objectStoreNames length");
                for (var i = 0; i < expected.length; i++)
                    assert.equal(db.objectStoreNames[i], expected[i], "objectStoreNames["+i+"]");

                assert.equal(objStore.indexNames.length, expected.length, "indexNames length");
                for (var i = 0; i < expected.length; i++)
                    assert.equal(objStore.indexNames[i], expected[i], "indexNames["+i+"]");

                count += 1;
                if (count >= 3) {
                    done();
                }
            };
        }