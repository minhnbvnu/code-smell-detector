function resetQueue() {
        var now = Date.now();
        for (var i = 0; i < fs[gracefulQueue].length; ++i) {
            // entries that are only a length of 2 are from an older version, don't
            // bother modifying those since they'll be retried anyway.
            if (fs[gracefulQueue][i].length > 2) {
                fs[gracefulQueue][i][3] = now; // startTime
                fs[gracefulQueue][i][4] = now; // lastTime
            }
        }
        // call retry to make sure we're actively processing the queue
        retry();
    }