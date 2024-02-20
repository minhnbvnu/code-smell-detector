function addToHash(hash, type, handler) {
        (hash[type] || (hash[type] = []))
            .push(handler);
    }