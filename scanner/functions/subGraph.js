function subGraph(A, B) {
    const r = new Float32Array(A.length);
    for (let i = 0; i < A.length; i++) {
        r[i] = A[i] - B[i];
    }
    return r;
}