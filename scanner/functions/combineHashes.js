function combineHashes(key1, key2) {
        return key2 ^ ((key1 >> 5) + key1);
    }