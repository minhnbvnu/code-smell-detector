function iteratorCallback(err) {
        if (err) {
            callback(err);
        } else if (++completed === length) {
            callback(null);
        }
    }