function VerifyRecordRemoved() {
            var rq = db.transaction("test")
                       .objectStore("test")
                       .get(key);

            rq.onsuccess = function(e) {
                assert.equal(e.target.result, undefined);
                done();
            };
        }