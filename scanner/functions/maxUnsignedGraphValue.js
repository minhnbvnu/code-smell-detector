function maxUnsignedGraphValue(A, outUMax) {
    const chans = outUMax.length;
    const values = A.length / chans;
    for (let i = 0; i < values; i++) {
        for (let j = 0; j < chans; j++) {
            const a = Math.abs(A[i * chans + j]);
            outUMax[j] = Math.max(outUMax[j], a);
        }
    }
}