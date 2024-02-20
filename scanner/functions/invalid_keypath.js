function invalid_keypath(keypath, desc) {
            numChecks += 1;

            var open_rq = createdb(done),
                store_name  = "store-" + Date.now() + Math.random();
            open_rq.onupgradeneeded = function (e) {
                var db = e.target.result;
                support.throws(function() {
                        db.createObjectStore(store_name, { keyPath: keypath })
                    }, 'SyntaxError', "createObjectStore with keyPath");

                var store = db.createObjectStore(store_name);
                support.throws(function() {
                        store.createIndex('index', keypath);
                    }, 'SyntaxError', "createIndex with keyPath");

                db.close();

                numDone += 1;
                if (numDone === numChecks) {
                    done();
                }
            };
            open_rq.onerror = function () {}; // Because of db.close() in onupgradeneeded
        }