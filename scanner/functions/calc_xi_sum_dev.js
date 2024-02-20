function calc_xi_sum_dev(xi_sum_d, a_d, b_d, alpha_d,
                         beta_d, sum_ab, nstates, obs_t, t){
    var i,j;
    for(i=0; i<nstates; ++i){
        for(j=0;j<nstates; ++j){
            xi_sum_d[(j * nstates) + i] += alpha_d[(t * nstates) + j] *
                a_d[(j * nstates) + i] *
                b_d[(obs_t * nstates) + i] *
                beta_d[((t+1) * nstates) + i] /
                sum_ab;
        }
    }
}