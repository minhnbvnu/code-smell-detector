function optionalParameters(desc, params) {
            numTried += 1;

            var open_rq = createdb(done);
            open_rq.onupgradeneeded = function(e) {
                e.target.result.createObjectStore("store", params);

                numDone += 1;
                if (numDone === numTried) {
                    done();
                }
            };
            open_rq.onsuccess = function () {};
        }