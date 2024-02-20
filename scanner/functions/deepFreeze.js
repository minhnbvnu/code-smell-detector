function deepFreeze(value) {
    if (! Object.isFrozen(value)) {
        if (Array.isArray(value)) {
            for (let i = 0; i < value.length; ++i) {
                deepFreeze(value[i]);
            }
        } else if (typeof value === 'object') {
            for (let k in value) {
                Object.freeze(value[k]);
            }
        }
        Object.freeze(value);
    }
}