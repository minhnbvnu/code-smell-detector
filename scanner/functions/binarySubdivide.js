function binarySubdivide (aX, aA, aB, mX1, mX2) {
   var currentX, currentT, i = 0;
   do {
     currentT = aA + (aB - aA) / 2.0;
     currentX = calcBezier(currentT, mX1, mX2) - aX;
     if (currentX > 0.0) {
       aB = currentT;
     } else {
       aA = currentT;
     }
   } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
   return currentT;
 }