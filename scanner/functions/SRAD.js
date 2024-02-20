function SRAD(niter,lambda) {
    for (iter=0; iter<niter; iter++) {
        
        calculateSum();
        // directional derivatives, ICOV, diffusion coefficent
        
        calculateDiffusion();
        // divergence & image update
        
        adjustValues(lambda);
    }
}