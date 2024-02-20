function OpenSecond (e) {
            assert.equal(db2, undefined);
            assert(db instanceof FDBDatabase);
            assert.deepEqual(Array.from(db.objectStoreNames), [ "store" ]);

            var openrq2 = indexedDB.open('db', 4);

            // 4
            openrq2.onblocked = function(e) {
                events.push("open2." + e.type);
                // We're closing connection from the other open()
                db.close();
            };

            // 5
            openrq2.onupgradeneeded = function(e) {
                db2 = e.target.result;

                events.push("open2." + e.type);

                assert(db2 instanceof FDBDatabase);

                // Errors
                db2.onversionchange = function () { throw new Error("db2.versionchange"); };
                db2.onerror = function () { throw new Error("db2.error"); };
                db2.abort = function () { throw new Error("db2.abort"); };
            };

            // 6
            openrq2.onsuccess = function(e) {
                events.push("open2." + e.type);

                assert.deepEqual(events,
                    [ "open.upgradeneeded",
                      "open.success",
                      "db.versionchange",
                      "open2.blocked",
                      "open2.upgradeneeded",
                      "open2.success",
                    ]);

                if (db2) db2.close();
                indexedDB.deleteDatabase('db');
                setTimeout(function() { done(); }, 10);
            };

            // Errors
            openrq2.onerror = function () { throw new Error("open2.error") };
        }