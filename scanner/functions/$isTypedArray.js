function $isTypedArray(a) {
    return ((a instanceof Object.getPrototypeOf(Uint8Array)) ||
            (a.buffer instanceof ArrayBuffer) ||
            (typeof a.buffer === 'object' && a.buffer.byteLength !== undefined && a.buffer.resizable !== undefined));
}