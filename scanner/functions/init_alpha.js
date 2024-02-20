function init_alpha(b_d, pi_d, nstates, alpha_d, ones_n_d, obs_t){
    i = 0;
    for(i = 0; i < nstates; ++i){
        alpha_d[i] = pi_d[i]*b_d[(obs_t*nstates)+i];
        ones_n_d[i] = 1.0;
    }
}