function safeObjectKeys(object) {
    if (Array.isArray(object)) {
        return Object.keys(object);
    } else {
        const keys = [];
        for (let k in object) {
            if (k[0] !== '$') {
                keys.push(k);
            }
        }
        return keys;
    }
}