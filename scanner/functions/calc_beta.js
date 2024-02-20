function calc_beta(a, b){

    /* Initialize beta variables */
    var offset  = ((length - 1) * nstates);
    var t;
    init_beta_dev(nstates, beta, offset, scale[length-1]);
    /* Calculate the rest of the beta variables */
    for (t = length - 2; t >= 0; t--) {
        calc_beta_dev(beta, b, scale[t], nstates, obs[t+1],t);

        mat_vec_mul( 'n', nstates, nstates, a, nstates,
                     beta, t * nstates, beta, t * nstates);
    }
    return 0;
}