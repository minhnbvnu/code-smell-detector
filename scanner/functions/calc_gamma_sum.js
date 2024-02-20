function calc_gamma_sum(){
    var size;
    var t;

    for(t=0; t<nstates; ++t) gamma_sum[t] = 0.0;
    /* Find sum of gamma variables */
    for (t = 0; t < length; t++) {
        calc_gamma_dev(gamma_sum, alpha, beta, nstates, t);
    }
}