function addToSeen(seen, key, value = true) {
            if (seen.has(key)) {
                return false;
            }
            seen.set(key, value);
            return true;
        }