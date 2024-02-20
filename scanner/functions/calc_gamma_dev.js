function calc_gamma_dev(gamma_sum_d, alpha_d, beta_d, nstates, t){
    var i;
    for(i=0; i< nstates; ++i){
        gamma_sum_d[i] += alpha_d[(t * nstates) + i] *
            beta_d[(t * nstates) + i];
    }
}