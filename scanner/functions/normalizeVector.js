function normalizeVector(vector) {
    const len = magnitude(vector);
    for (const key in vector) {
        vector[key] /= len;
    }
}