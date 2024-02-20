function invalid_key(desc, key) {
            numChecks += 1;

            var open_rq = createdb(done);
            var objStore, objStore2;

            // set the current test, and run it
            open_rq.onupgradeneeded = function(e) {
                objStore = e.target.result.createObjectStore("store");
                support.throws(function() {
                    objStore.add("value", key);
                }, 'DataError', desc);

                /*if (is_cloneable(key)) {
                    objStore2 = e.target.result.createObjectStore("store2", { keyPath: ["x", "keypath"] });
                    support.throws(function() {
                        objStore2.add({ x: "value", keypath: key });
                    }, 'DataError', desc);
                }*/

                numDone += 1;
                if (numDone === numChecks) {
                    done();
                }
            };
            open_rq.onsuccess = function () {};
        }