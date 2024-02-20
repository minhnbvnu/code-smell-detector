function calc_xi_sum(a, b){
    var sum_ab;
    var t;

    for(t=0; t<nstates;++t)xi_sum[t]=0;
    /* Find the sum of xi variables */
    for (t = 0; t < length - 1; t++) {
        /* Calculate denominator */
        sum_ab = dot_product(nstates, alpha, t * nstates,
                             beta, t * nstates);
        calc_xi_sum_dev(xi_sum, a, b, alpha, beta, sum_ab, nstates,obs[t+1], t);
    }
    return 0;
}