function noKeyStartsWithDot(obj) {
            return !some(getOwnKeys(obj), (k) => startsWith(k, "."));
        }