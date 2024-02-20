function calculateDiffusion() {
    for (j=0; j<Nc; j++) {                                  // do for the range of columns in IMAGE
        for (i=0; i<Nr; i++) {                              // do for the range of rows in IMAGE
            // current index/pixel
            var k = i + Nr*j;                                   // get position of current element
            var Jc = image[k];                                  // get value of the current element
            // directional derivates (every element of IMAGE)
            dN[k] = image[iN[i] + Nr*j] - Jc;               // north direction derivative
            dS[k] = image[iS[i] + Nr*j] - Jc;               // south direction derivative
            dW[k] = image[i + Nr*jW[j]] - Jc;               // west direction derivative
            dE[k] = image[i + Nr*jE[j]] - Jc;               // east direction derivative

            // normalized discrete gradient mag squared (equ 52,53)
            var G2 = (dN[k]*dN[k] + dS[k]*dS[k] +               // gradient (based on derivatives)
                    dW[k]*dW[k] + dE[k]*dE[k]) / (Jc*Jc);
            // normalized discrete laplacian (equ 54)
            L = (dN[k] + dS[k] + dW[k] + dE[k]) / Jc;       // laplacian (based on derivatives)

            // ICOV (equ 31/35)
            var num  = (0.5*G2) - ((1.0/16.0)*(L*L)) ;          // num (based on gradient and laplacian)
            var den  = 1 + (0.25*L);                            // den (based on laplacian)
            var qsqr = num/(den*den);                           // qsqr (based on num and den)

            // diffusion coefficent (equ 33) (every element of IMAGE)
            den = (qsqr-q0sqr) / (q0sqr * (1+q0sqr));       // den (based on qsqr and q0sqr)
            c[k] = 1.0 / (1.0+den);                         // diffusion coefficient (based on den)

            // saturate diffusion coefficent to 0-1 range
            if (c[k] < 0)                                   // if diffusion coefficient < 0
                {c[k] = 0;}                                 // ... set to 0
            else if (c[k] > 1)                              // if diffusion coefficient > 1
                {c[k] = 1;}                                 // ... set to 1
        }
    }
}