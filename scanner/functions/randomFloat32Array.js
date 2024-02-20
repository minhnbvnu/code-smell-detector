function randomFloat32Array(length) {
    let floats = new Float32Array(length);
    for (let i = 0; i < floats.length; i++) {
        floats[i] = (Math.random() - 0.5)*Math.pow(2, 16) +
            (Math.random() - 0.5) +
            (Math.random() - 0.5) / Math.pow(2, 16);
    }
    return floats;
}