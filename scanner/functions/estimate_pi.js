function estimate_pi(pi){

    var sum_ab;
    /* Calculate denominator */
    sum_ab = dot_product(nstates, alpha, 0, beta, 0);

    /* Estimate Pi values */
    est_pi_dev(pi, alpha, beta, sum_ab,nstates);

    return 0;
}