function runFFT(twoExp){
    if (twoExp === undefined) {
        twoExp = 10;
    }

    if (twoExp < 0 || twoExp > 30) {
        throw new Error("ERROR: invalid exponent of '" + twoExp + "' for input size");
    }
    var n = 1 << twoExp;
    var data1D = randomComplexArray(n);
    var data2D = randomComplexMatrix(n);
    var t1, t2;

    /*
    t1 = performance.now();
    var results = fftSimple(data1D.r,data1D.i);
    t2 = performance.now();
    console.log("The total 1D FFT time for " + n + " size was " + (t2-t1)/1000 + " s");
    */

    t1 = performance.now();
    var results2D = fft2D(data2D);
    t2 = performance.now();
    console.log("The total 2D FFT time for " + n + " x " + n + " was " + (t2-t1)/1000 + " s");
    return { status: 1,
             options: "runFFT(" + twoExp + ")",
             time: (t2 - t1) / 1000 };
}