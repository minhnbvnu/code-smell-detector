function getType(arr) {
    if (arr instanceof Float32Array) {
        return 'FLOAT';
    } else if (arr instanceof Int16Array) {
        return 'SHORT';
    } else if (arr instanceof Uint16Array) {
        return 'UNSIGNED_SHORT';
    } else if (arr instanceof Int8Array) {
        return 'BYTE';
    } else if (arr instanceof Uint8Array || arr instanceof Uint8ClampedArray) {
        return 'UNSIGNED_BYTE';
    }
    return 'FLOAT';
}