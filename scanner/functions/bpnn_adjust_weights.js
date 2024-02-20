function bpnn_adjust_weights(delta, ndelta, ly, nly, w, oldw) {
    var new_dw;
    var k, j;
    var nr = nly + 1,
        nc = ndelta + 1;
    ly[0] = 1.0;
    for (j = 1; j < nc; j++) {
        for (k = 0; k < nr; k++) {
            new_dw = ((ETA * delta[j] * ly[k]) + (MOMENTUM * oldw[k * nc + j]));
            w[k * nc + j] += new_dw;
            oldw[k * nc + j] = new_dw;
        }
    }
}