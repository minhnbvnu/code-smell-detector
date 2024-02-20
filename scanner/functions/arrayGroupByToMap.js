function arrayGroupByToMap(array, getKey) {
        const groups = new Map();
        for (const item of array) {
            const key = getKey(item);
            const existing = groups.get(key);
            if (existing) {
                existing.push(item);
            }
            else {
                groups.set(key, [item]);
            }
        }
        return groups;
    }