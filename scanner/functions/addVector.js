function addVector(vector1, vector2) {
    for (const key in vector2) {
        vector1[key] = (vector1[key] || 0) + vector2[key];
    }
}