function acc_b_dev(b_d, alpha_d, beta_d, sum_ab, nstates, nsymbols, obs_t, t){
    var i,j;
    for(i=0; i<nstates; ++i){
        for(j=0; j<nsymbols; ++j){
            if(j==obs_t){
                b_d[(j * nstates) + i] += alpha_d[(t * nstates) + i] *
                    beta_d[(t * nstates) + i] / sum_ab;
            }
        }
    }
}