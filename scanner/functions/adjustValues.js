function adjustValues(lambda) {
    lambda = 0.25*lambda;
    for (j=0; j<Nc; j++) {                                  // do for the range of columns in IMAGE
            // printf("NUMBER OF THREADS: %d\n", omp_get_num_threads());
        for (i=0; i<Nr; i++) {                              // do for the range of rows in IMAGE
            // current index
            var k = i + Nr*j;                                   // get position of current element
            // diffusion coefficent
            var cN = c[k];                                      // north diffusion coefficient
            var cS = c[iS[i] + Nr*j];                           // south diffusion coefficient
            var cW = c[k];                                      // west diffusion coefficient
            var cE = c[i + Nr*jE[j]];                           // east diffusion coefficient
            // divergence (equ 58)
            var D = cN*dN[k] + cS*dS[k] + cW*dW[k] + cE*dE[k];  // divergence
            // image update (equ 61) (every element of IMAGE)
            image[k] = image[k] + lambda*D;            // updates image (based on input time step and divergence)
        }
    }
}