function buildKernel() {
   var ss = sigma * sigma;
   var factor = 2 * Math.PI * ss;
   kernel = [];
   kernel.push([]);
   var i = 0, j;

   do {
       var g = Math.exp(-(i * i) / (2 * ss)) / factor;
       if (g < 1e-3) break;
       kernel[0].push(g);
       ++i;
   } while (i < 7);

   kernelSize = i;
   for (j = 1; j < kernelSize; ++j) {
       kernel.push([]);
       for (i = 0; i < kernelSize; ++i) {
           var g = Math.exp(-(i * i + j * j) / (2 * ss)) / factor;
           kernel[j].push(g);
       }
   }
   kernelSum = 0;
   for (j = 1 - kernelSize; j < kernelSize; ++j) {
       for (i = 1 - kernelSize; i < kernelSize; ++i) {
           kernelSum += kernel[Math.abs(j)][Math.abs(i)];
       }
   }
}