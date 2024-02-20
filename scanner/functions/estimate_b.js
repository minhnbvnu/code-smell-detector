function estimate_b(b)
{
    var sum_ab;
    var t;
    var offset;

    for(t=0; t<nstates*nsymbols; ++t) b[t] = 0.0;

    for (t = 0; t < length; t++) {

        /* Calculate denominator */
        sum_ab = dot_product(nstates, alpha, t * nstates,
                             beta, t * nstates);
        acc_b_dev(b, alpha, beta, sum_ab, nstates, nsymbols, obs[t+1], t);
    }

    /* Re-estimate B values */
    est_b_dev(b, gamma_sum, nstates, nsymbols);

    /* Sum rows of B to get scaling values */
    // mat_vec_mul( 'N', nstates, nsymbols, 1.0f, b_d, nstates,
    // ones_s_d, 1, 0, c_d, 1 );
    for(t=0; t<nstates; ++t) c[t] = 0.0;
    mat_vec_mul( 'n', nstates, nsymbols, b, nstates,
                 ones_s, 0, c, 0);
    /* Normalize B matrix */
    scale_b_dev(b, c, nstates, nsymbols);
    return 0;
}