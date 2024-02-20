function init_beta_dev(nstates, beta_d, offset, scale){
    var i = 0;
    for(i=0; i < nstates; ++i){
        beta_d[offset + i] = 1.0 / scale;
    }
}