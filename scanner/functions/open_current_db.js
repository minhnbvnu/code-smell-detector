function open_current_db(e) {
            var open_rq3 = indexedDB.open(e.target.result.name);
            open_rq3.onsuccess = function(e) {
                assert.equal(e.target.result.version, 14, "db.version")
                done();
            };
            open_rq3.onupgradeneeded = function () { throw new Error('Unexpected upgradeneeded') };
            open_rq3.onerror = function () { throw new Error('Unexpected error') };

            assert(did_upgrade, 'did upgrade');
        }