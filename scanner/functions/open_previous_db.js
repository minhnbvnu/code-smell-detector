function open_previous_db(e) {
            var open_rq3 = indexedDB.open(e.target.result.name, 13);
            open_rq3.onerror = function(e) {
                assert.equal(e.target.error.name, 'VersionError', 'e.target.error.name')
                done();
            };
            open_rq3.onupgradeneeded = function () { throw new Error('Unexpected upgradeneeded') };
            open_rq3.onsuccess = function () { throw new Error('Unexpected success') };
        }