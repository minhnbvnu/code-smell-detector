function paramsIdentical(a, b) {
    if (a && !b) return false;
    if (!a && b) return false;
    a = a.data;
    b = b.data;
    if (a === b) return true;
    if (a instanceof Float32Array && b instanceof Float32Array) {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }
    return false;
}