function floatsAsBytes(floats) {
    if (floats instanceof Float64Array) {
        return new Uint8Array(new Float32Array(floats).buffer, 0, floats.length << 2);
    }
    if (floats instanceof Float32Array) {
        return new Uint8Array(floats.buffer, 0, floats.length << 2);
    }
    throw new DetailedError("Not a Float32Array or Float64Array", {type: typeof floats, floats});
}