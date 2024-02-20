function estimate_a(a)
{
    var sum_ab;

    /* Calculate denominator */
    sum_ab = dot_product(nstates, alpha, (length - 1) * nstates,
                         beta, (length - 1) * nstates);
    est_a_dev(a, alpha, beta, xi_sum, gamma_sum, sum_ab, nstates, length);

    /* Sum rows of A to get scaling values */
    // mat_vec_mul( 'T', nstates, nstates, 1.0f, a_d, nstates,
    // ones_n_d, 1, 0, c_d, 1 );
    mat_vec_mul( 't', nstates, nstates, a, nstates,
                 ones_n, 0, c, 0);

    /* Normalize A matrix */
    // scale_a_dev<<<grid, threads>>>( a_d,
    // c_d,
    // nstates);
    scale_a_dev(a, c, nstates);

    return 0;
}