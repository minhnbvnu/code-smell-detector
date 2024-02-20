function allKeysStartWithDot(obj) {
            return every(getOwnKeys(obj), (k) => startsWith(k, "."));
        }