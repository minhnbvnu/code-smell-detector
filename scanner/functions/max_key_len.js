function max_key_len(obj) {
        return Math.max(0, ...Object.keys(obj).map(k => k.length));
    }