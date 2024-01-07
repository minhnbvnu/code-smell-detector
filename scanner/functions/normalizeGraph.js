function normalizeGraph(A, uMax) {
    const chans = uMax.length;
    const values = A.length / chans;
    for (let i = 0; i < values; i++) {
        for (let j = 0; j < chans; j++) {
            A[i * chans + j] /= (uMax[j] === 0 ? 1 : uMax[j]);
            A[i * chans + j] *= 0.5;
            A[i * chans + j] += 0.5;
        }
    }
}