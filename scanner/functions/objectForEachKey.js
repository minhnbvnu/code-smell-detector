function objectForEachKey(obj, callback) {
        const keys = Object.keys(obj);
        for (const key of keys) {
            callback(key);
        }
    }