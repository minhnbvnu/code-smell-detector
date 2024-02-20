function calc_beta_dev(beta_d, b_d, scale_t, nstates, obs_t, t){
    var i;
    for(i=0; i<nstates; ++i){
        beta_d[(t * nstates) + i] = beta_d[((t + 1) * nstates) + i] *
            b_d[(obs_t * nstates) + i] / scale_t;
    }
}