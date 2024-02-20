function scale_b_dev(b_d, c_d, nstates, nsymbols){
    var i,j;
    for(i=0; i<nstates; ++i){
        for(j=0; j<nsymbols; ++j){
            if (Math.abs(b_d[(i * nsymbols) + j]) <0.000001)
            {
                b_d[(i * nsymbols) + j] = 1e-10;
            }
            else
            {
                b_d[(i * nsymbols) + j] = b_d[(i * nsymbols) + j] / c_d[i];
            }
            // if (fabs(b_d[(j * nstates) + i]) <0.000001)
            // {
            //   b_d[(j * nstates) + i] = 1e-10;
            //   printf("something hits here\n");
            // }
            // else
            // {
            //   b_d[(j * nstates) + i] = b_d[(j * nstates) + i] / c_d[i];
            // }
        }
    }
}