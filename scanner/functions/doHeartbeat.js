function doHeartbeat() {
        memcached.stats(function (err, result) {
            if (err && err.error && (err.error != {} && err.error != [])) {
                self.emit(cacheEvents.ERROR, {error:err});
            }
            self.emit(cacheEvents.HEART_BEAT, {data:result});
        });
    }