function kernel_cpu(par, dim, box, rv, qv, fv) {
    var alpha, a2;                      // parameters
    var i, j, k, l;                     // counters
    var first_i, pointer, first_j;      // neighbor box
    // common
    var r2, u2, fs, vij, fxij, fyij, fzij;
    var d;

    //  INPUTS
    alpha = par.alpha;
    a2 = 2.0*alpha*alpha;
    // PROCESS INTERACTIONS

    for(l=0; l<dim.number_boxes; l=l+1) {
        // home box - box parameters
        first_i = box[l].offset;

        //  Do for the # of (home+neighbor) boxes
        for(k=0; k<(1+box[l].nn); k++) {
            //  neighbor box - get pointer to the right box
            if(k==0) {
                pointer = l;    // set first box to be processed to home box
            } else {
                pointer = box[l].nei[k-1].number;   // remaining boxes are neighbor boxes
            }

            first_j = box[pointer].offset;

            for(i=0; i<NUMBER_PAR_PER_BOX; i=i+1) {
                for(j=0; j<NUMBER_PAR_PER_BOX; j=j+1) {
                    r2 = rv[first_i+i].v + rv[first_j+j].v - DOT(rv[first_i+i],rv[first_j+j]);
                    u2 = a2*r2;
                    vij= Math.exp(-u2);
                    fs = 2.*vij;
                    var dx = rv[first_i+i].x  - rv[first_j+j].x;
                    var dy = rv[first_i+i].y  - rv[first_j+j].y;
                    var dz = rv[first_i+i].z  - rv[first_j+j].z;
                    fxij=fs*dx;
                    fyij=fs*dy;
                    fzij=fs*dz;

                    // forces
                    fv[first_i+i].v +=  qv[first_j+j]*vij;
                    fv[first_i+i].x +=  qv[first_j+j]*fxij;
                    fv[first_i+i].y +=  qv[first_j+j]*fyij;
                    fv[first_i+i].z +=  qv[first_j+j]*fzij;
                }
            }
        }
    }
}