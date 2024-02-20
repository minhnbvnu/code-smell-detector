function bpnn_output_error(delta, target, output, nj) {
    var o, t, errsum;
    errsum = 0.0;
    for (var j = 1; j <= nj; j++) {
        o = output[j];
        t = target[j];
        delta[j] = o * (1.0 - o) * (t - o);
        errsum += Math.abs(delta[j]);
    }
    return errsum;
}