function bpnn_layerforward(l1, l2, conn, n1, n2) {
    var sum;
    var j, k;

    var nc = n2 + 1,
        nr = n1 + 1;

    /*** Set up thresholding unit ***/
    l1[0] = 1.0;
    /*** For each unit in second layer ***/
    for (j = 1; j < nc; j++) {
        /*** Compute weighted sum of its inputs ***/
        sum = 0.0;
        for (k = 0; k < nr; k++) {
            sum += conn[k * nc + j] * l1[k];
        }
        l2[j] = squash(sum);
    }
}