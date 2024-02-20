function calc_alpha_dev(nstates, alpha_d, offset, b_d, obs_t){
    var i = 0;
    for(i=0; i<nstates; ++i){
        alpha_d[offset + i] = alpha_d[offset + i] * b_d[(obs_t * nstates) + i];
    }
}