function est_b_dev(b_d, gamma_sum_d, nstates, nsymbols){
    var i,j;
    for(i=0; i<nstates; ++i){
        for(j=0; j<nsymbols; ++j){
            b_d[(j* nstates) + i] = b_d[(j * nstates) + i] /
                gamma_sum_d[i];
        }
    }
}