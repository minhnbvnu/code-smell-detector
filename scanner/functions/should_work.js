function should_work(val) {
            var rq = createdb(done, undefined, val)
            rq.onupgradeneeded = function() {
                ct++;
                if (ct === 2) {
                    done()
                }
            }
            rq.onsuccess = function () {}
        }