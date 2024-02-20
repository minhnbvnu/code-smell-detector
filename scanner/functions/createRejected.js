function createRejected(val) {
            return createPromise().errback(val);
        }