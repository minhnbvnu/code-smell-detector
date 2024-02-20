function addToMapGroup(map, key, value) {
        const existing = map.get(key);
        if (existing) {
            existing.push(value);
        }
        else {
            map.set(key, [value]);
        }
    }