function scale_alpha_values( nstates, alpha_d, offset, scale){
    var i =0;
    for(i=0; i<nstates; ++i) alpha_d[offset + i] = alpha_d[offset + i]/scale;
}