function getTForX (aX) {
     var intervalStart = 0.0;
     var currentSample = 1;
     var lastSample = kSplineTableSize - 1;

     for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
       intervalStart += kSampleStepSize;
     }
     --currentSample;

     // Interpolate to provide an initial guess for t
     var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
     var guessForT = intervalStart + dist * kSampleStepSize;

     var initialSlope = getSlope(guessForT, mX1, mX2);
     if (initialSlope >= NEWTON_MIN_SLOPE) {
       return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
     } else if (initialSlope === 0.0) {
       return guessForT;
     } else {
       return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
     }
   }