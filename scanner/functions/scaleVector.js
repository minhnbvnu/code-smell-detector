function scaleVector(vector, scalar) {
    for (const key in vector) {
        vector[key] *= scalar;
    }
}