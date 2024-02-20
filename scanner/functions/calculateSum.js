function calculateSum() {
    var sum=0;
    var sum2=0;
    for (i=r1; i<=r2; i++) {                                // do for the range of rows in ROI
        for (j=c1; j<=c2; j++) {                            // do for the range of columns in ROI
            var tmp   = image[i + Nr*j];                        // get coresponding value in IMAGE
            sum  += tmp;                                    // take corresponding value and add to sum
            sum2 += tmp*tmp;                                // take square of corresponding value and add to sum2
        }
    }
    var meanROI = sum / NeROI;                                  // gets mean (average) value of element in ROI
    var varROI  = (sum2 / NeROI) - meanROI*meanROI;             // gets variance of ROI
    q0sqr   = varROI / (meanROI*meanROI);                   // gets standard deviation of ROI
}