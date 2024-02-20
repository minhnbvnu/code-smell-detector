function scale_a_dev(a_d, c_d, nstates){
    var i,j;
    for(i=0; i<nstates; ++i){
        for(j=0; j<nstates; ++j){
            a_d[(j * nstates) + i] = a_d[(j * nstates) + i] / c_d[j];
        }
    }
}