function variedFloat32Array(length) {
    return new Float32Array([...INTERESTING_FLOATS, ...randomFloat32Array(length - INTERESTING_FLOATS.length)]);
}