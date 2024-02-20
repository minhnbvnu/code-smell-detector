function generateKeyForStore (tx, store, cb, sqlFailCb) {
    getCurrentNumber(tx, store, function (key) {
        if (key > MAX_ALLOWED_CURRENT_NUMBER) { // 2 ^ 53 (See <https://github.com/w3c/IndexedDB/issues/147>)
            cb('failure'); // eslint-disable-line n/no-callback-literal
            return;
        }
        // Increment current number by 1 (we cannot leverage SQLite's
        //  autoincrement (and decrement when not needed), as decrementing
        //  will be overwritten/ignored upon the next insert)
        setCurrentNumber(
            tx, store, key,
            function () {
                cb(null, key, key);
            },
            sqlFailCb
        );
    }, sqlFailCb);
}