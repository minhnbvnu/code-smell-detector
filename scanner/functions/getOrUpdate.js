function getOrUpdate(map2, key, callback) {
            if (map2.has(key)) {
                return map2.get(key);
            }
            const value = callback();
            map2.set(key, value);
            return value;
        }