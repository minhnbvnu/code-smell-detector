function checkArray(obj, key, fallback) {
        /* c8 ignore start */
        if (Object.prototype.hasOwnProperty.call(obj, key) && !Array.isArray(obj[key])) {
            throw new TypeError(`${key}, if provided, must be an Array`);
        } /* c8 ignore stop */
        return obj[key] || fallback;
    }