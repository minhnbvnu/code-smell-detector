function objectReduceKey(obj, callback, initial) {
        let accumulator = initial;
        objectForEachKey(obj, key => {
            accumulator = callback(accumulator, key);
        });
        return accumulator;
    }