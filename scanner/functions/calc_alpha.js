function calc_alpha(a, b, pi){
    var log_lik;
    var t;
    var offset_cur;
    var offset_prev;

    // initialize alpha variables
    init_alpha(b, pi, nstates, alpha, ones_n, obs[0]);

    /* Sum alpha values to get scaling factor */
    scale[0] = dot_product(nstates, alpha, 0, ones_n, 0);

    // Scale the alpha values
    scale_alpha_values(nstates, alpha,0,scale[0]);

    /* Initilialize log likelihood */
    log_lik = log10(scale[0]);

    /* Calculate the rest of the alpha variables */
    for (t = 1; t < length; t++) {

        /* Calculate offsets */
        offset_prev = (t - 1) * nstates;
        offset_cur = t * nstates;

        /* Multiply transposed A matrix by alpha(t-1) */
        /* Note: the matrix is auto-transposed by cublas reading column-major */
        // mat_vec_mul( 'N', nstates, nstates, 1.0f, a_d, nstates,
        //              alpha_d + offset_prev, 1, 0, alpha_d + offset_cur, 1 );
        mat_vec_mul( 'n', nstates, nstates, a, nstates,
                     alpha, offset_prev, alpha, offset_cur);

        calc_alpha_dev(nstates, alpha, offset_cur, b, obs[t]);

        /* Sum alpha values to get scaling factor */
        scale[t] = dot_product(nstates, alpha, offset_cur, ones_n, 0);

        // scale alpha values
        scale_alpha_values(nstates, alpha, offset_cur, scale[t]);

        log_lik += log10(scale[t]);
    }
    return log_lik;
}