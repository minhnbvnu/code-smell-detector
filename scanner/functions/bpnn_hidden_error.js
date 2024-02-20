function bpnn_hidden_error(delta_h, nh, delta_o, no, who, hidden) {
    var j, k;
    var h, sum, errsum;

    var nr = nh + 1,
        nc = no + 1;

    errsum = 0.0;
    for (j = 1; j < nr; j++) {
        h = hidden[j];
        sum = 0.0;
        for (k = 1; k < nc; k++) {
            sum += delta_o[k] * who[j * no + k];
        }
        delta_h[j] = h * (1.0 - h) * sum;
        errsum += Math.abs(delta_h[j]);
    }
    return errsum;
}