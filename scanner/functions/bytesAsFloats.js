function bytesAsFloats(bytes) {
    if (!(bytes instanceof Uint8Array)) {
        throw new DetailedError("Not a Uint8Array", {type: typeof bytes, bytes});
    }
    return new Float32Array(bytes.buffer, 0, bytes.length >> 2);
}