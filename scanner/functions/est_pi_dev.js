function est_pi_dev(pi_d, alpha_d, beta_d, sum_ab, nstates){
    var i;
    for(i=0; i<nstates; ++i){
        pi_d[i] = alpha_d[i] * beta_d[i] / sum_ab;
    }
}