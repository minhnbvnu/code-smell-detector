function est_a_dev(a_d, alpha_d, beta_d,
                   xi_sum_d, gamma_sum_d, sum_ab, nstates, length){

    var i,j;
    for(i=0; i<nstates; ++i){
        for(j=0; j<nstates; ++j){
            a_d[(j * nstates) + i] = xi_sum_d[(j * nstates) + i] /
                (gamma_sum_d[j] -
                 alpha_d[(j * nstates) + i] *
                 beta_d[(j * nstates) + i] /
                 sum_ab);
        }
    }
}